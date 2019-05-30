'use strict'

const { sha3, ecsign, privateToAddress, longToByteArray, intToBuffer } = require('../local/utils')
const { decimalToHex } = require('../utils')
const { Buffer } = require('safe-buffer')
const jayson = require('jayson')
var Uint64BE = require("int64-buffer").Uint64BE;

const TX_PROP_ORDER = ['branchId', 'version', 'type', 'timestamp', 'bodyHash', 'bodyLength'];

class Transaction {
  constructor (branchId, contractVersion, methodName, params) {
    if(typeof branchId !== 'string' ||
       typeof methodName !== 'string' ||
       typeof params !== 'object') {
      throw new TypeError('Invalid parameters.')
    }
    this.branchId = branchId
    this.chain = this.branchId
    this.body = Transaction._createBody(contractVersion, methodName, params)
    this.bodyLength = this.body.length
  }

  static _createBody(contractVersion, methodName, params) {
    return `{"contractVersion":"${contractVersion}","method":"${methodName}","params":${JSON.stringify(params)}}`
  }

  sign (privateKey) {
    if (this.signature !== undefined) throw new Error('Already signed.')

    this._prepare()
    let messageHash = this._createMessageHash()
    let sig = ecsign(messageHash, Buffer.from(privateKey, 'hex'))
    this.signature = this._convertVrsHexString(sig)
  }

  send (host = 'http://localhost:8080', callback) {
    // const host = 'http://localhost:8080'
    let request = callback || jayson.client.http(`${host}/api/transaction`).request
    return new Promise((resolve, reject) => {
      request('sendTransaction', {tx: this}, (err, res) => {
        if(err) {
          console.error(err)
          reject(err)
        }
        resolve(res)
      })
    })
  }

  sendRawTransaction(host, callback) {
      let request = callback || jayson.client.http(`${host}/api/transaction`).request
      return new Promise((resolve, reject) => {
          request('sendRawTransaction', {rawTx: this.getRawTransaction()}, (err, res) => {
              if(err) {
                  console.error(err)
                  reject(err)
              }
              resolve(res)
          })
      })
  }

  _createTransactionHash () {
    return sha3(Buffer.from(this._createRawData() + this.signature, 'hex'))
      .toString('hex')
  }

  _convertVrsHexString(signatureObject) {
    let result = []
    'vrs'.split("").forEach(key => {
      let value = signatureObject[key]
      if (!(value instanceof Buffer)) {
        value = Buffer.from(value.toString(16), 'hex')
      }
      result.push(value)
    })
    return Buffer.concat(result).toString('hex')
  }

  _prepare () {
    this._hashingBody()
    if (!this.timestamp) {
        this.timestamp = new Date().getTime();
        //this.timestamp = '0000000000000000'
    }
    if (!this.type) {
        this.type = '0000000000000000'
    }
    if (!this.version) {
        this.version = '0000000000000000'
    }
  }

  _createMessageHash () {
    let rawData = this._createRawData()
    return sha3(Buffer.from(rawData, 'hex'))
  }

  _createRawData () {
    let result = []
    TX_PROP_ORDER.forEach(key => {
      let value = null
      if (["timestamp","bodyLength"].indexOf(key) > -1) {
          value = new Uint64BE(this[key]).toBuffer().toString('hex')
      } else {
          value = this[key]
      }
      result.push(value)
    })
    return result.join("")
  }

  _hashingBody () {
    this.bodyHash = `${sha3(Buffer.from(this.body)).toString('hex')}`
  }

  getRawTransaction() {
    let result = [];
      TX_PROP_ORDER.forEach(key => {
        let val = null;
        if (["timestamp","bodyLength"].indexOf(key) > -1) {
            val = new Uint64BE(this[key]).toBuffer().toString('hex')
        } else {
            val = this[key]
        }
        console.log("key : val : size ", key, val, val.length/2)
          result.push(val)
      })
      result.push(this.signature)
      console.log("signature length : ",this.signature.length/2)
      let body = Buffer.from(this["body"]).toString("hex")
      result.push(body)
      console.log("body : ", body.length/2)

      return result.join("")
  }
}

module.exports = Transaction
