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
    this.contractVersion = contractVersion;
    this.branchId = branchId
    this.chain = this.branchId
    this.body = Transaction._createBody(methodName, params)
    this.bodyLength = this.body.length
  }

  static _createBody(methodName, params) {
    return `[{"contractVersion":"${this.contractVersion}","method":"${methodName}","param":${JSON.stringify(params)}}]`
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
        this.timestamp = new Date().getTime()
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
    let result = ''
    TX_PROP_ORDER.forEach(key => {
      let value = this[key]
      if (isNaN(value)) {
        result = result.concat(value)
      } else {
        result = result.concat(decimalToHex(value))
      }
    })

    return result
  }

  _hashingBody () {
    this.bodyHash = `${sha3(Buffer.from(this.body)).toString('hex')}`
  }

  getRawTransaction() {
    let result = [];
      TX_PROP_ORDER.forEach(key => {
        if (key in ["timestamp","bodyLength"]) {
            result.push(new Uint64BE(this[key]).toBuffer().toString('hex'))
        } else {
            result.push(this[key])
        }
      })
      result.push(this.signature)
      result.push(Buffer.from(this["body"]).toString("hex"))

      return result.join("")
  }
}

module.exports = Transaction
