'use strict'

import { sha3 } from '../local/utils'
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
    this.signature = ''
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
