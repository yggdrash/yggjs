'use strict'

import { sha3, ecsign, privateToAddress } from '../local/utils'
import { decimalToHex } from '../utils/utils'
import { Buffer } from 'safe-buffer'
import jayson from 'jayson'

const TX_PROP_ORDER = ['chain', 'version', 'type', 'timestamp', 'bodyHash', 'bodyLength'];

class Transaction {
  constructor (branchId, methodName, params, option) {
    this.chain = branchId
    this.body = Transaction._createBody(methodName, params)
    this.bodyLength = this.body.length
  }

  static _createBody(methodName, params) {
    return `[{"method":"${methodName}","param":${JSON.stringify(params)}}]`
  }

  sign (privateKey) {
    this._prepare()
    let messageHash = this._createMessageHash()
    let sig = ecsign(messageHash, Buffer.from(privateKey, 'hex'))
    let address = privateToAddress(Buffer.from(privateKey, 'hex'))
    this.author = address.toString('hex')
    this.signature = this._convertVrsHexString(sig)
    this.hash = this._createTransactionHash()
  }

  send (callback) {
    const host = 'http://localhost:8080'
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
    this.timestamp = new Date().getTime().toString()
    this.type = '0000000000000000'
    this.version = '0000000000000000'
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
}

module.exports = Transaction
