'use strict'

import { sha3, ecsign, privateToAddress } from '../local/utils'
import { decimalToHex } from '../utils/utils'
import { Buffer } from 'safe-buffer'

const TX_PROP_ORDER = ['chain', 'version', 'type', 'timestamp', 'bodyHash', 'bodyLength'];

class Transaction {
  constructor (branchId, methodName, params, option) {
    this.chain = branchId
    this.body = Transaction._createBody(methodName, params)
    this.bodyLength = this.body.length
  }

  static _createBody(methodName, params) {
    return `[{"method":"${methodName}","params":[${JSON.stringify(params)}]}]`
  }

  sign (privateKey) {
    this.prepare()
    let messageHash = this.createMessageHash()
    let sig = ecsign(messageHash, Buffer.from(privateKey, 'hex'))
    let address = privateToAddress(Buffer.from(privateKey, 'hex'))
    this.author = address.toString('hex')
    this.signature = this.convertVrsHexString(sig)
    this.hash = this.createTransactionHash()
  }

  createTransactionHash () {
    return sha3(Buffer.from(this.createRawData() + this.signature, 'hex'))
      .toString('hex')
  }

  convertVrsHexString(signatureObject) {
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

  prepare () {
    this.hashingBody()
    this.timestamp = '1544156089304'
    this.type = '0000000000000000'
    this.version = '0000000000000000'
  }

  createMessageHash () {
    let rawData = this.createRawData()
    return sha3(Buffer.from(rawData, 'hex'))
  }

  createRawData () {
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

  hashingBody () {
    this.bodyHash = `${sha3(Buffer.from(this.body)).toString('hex')}`
  }
}

module.exports = Transaction
