'use strict'

const yggUtil = require('../utils')
const { jsonToArrayString, jsonToString } = require('../../utils/index')
const { Buffer } = require('safe-buffer')

/**
 * Creates a new transaction object.
 *
 * @example
 * let txHeaderData = {
 *    "timeStamp":`0x${timestamp}`,
 *    "nonce":`0x${version}`,
 *    "bodyHash":`0x${bodyHashHex}`,
 *    "bodyLength":`0x${bodyLengthHex}`
 *  }
 * var tx = new Transaction(txHeaderData)
 *
 * @class
 * @param {Buffer | Array | Object} data 
 *
 * @param {Buffer} data.timeStamp timestamp
 * @param {Buffer} data.nonce nonce
 * @param {Buffer} data.bodyHashHex body hash to keccak 
 * @param {Buffer} data.bodyLength body length
 * @param {Buffer} data.v EC signature parameter
 * @param {Buffer} data.r EC signature parameter
 * @param {Buffer} data.s EC recovery ID
 * */

class Transaction {
  constructor (data) {
      data = data || {}
        // Define Properties
        const fields = [{
          name: 'timeStamp',
          length: 8,
          allowZero: true,
          default: Buffer.from([])
        }, {
          name: 'nonce',
          length: 16,
          allowLess: true,
          default: Buffer.from([])
        }, {
          name: 'bodyHash',
          length: 32,
          allowLess: true,
          default: Buffer.from([])
        }, {
          name: 'bodyLength',
          length: 8,
          allowZero: true,
          default: Buffer.from([])
        }, {
          name: 'v',
          allowZero: true,
          default: Buffer.from([0x1c])
        }, {
          name: 'r',
          length: 32,
          allowZero: true,
          allowLess: true,
          default: Buffer.from([])
        }, {
          name: 's',
          length: 32,
          allowZero: true,
          allowLess: true,
          default: Buffer.from([])
        }]
        /**
         * @method serialize
         * @return {Buffer}
         * @memberof Transaction
         * @name serialize
         */
        // attached serialize
        yggUtil.defineProperties(this, fields, data)

        /**
         * @property {Buffer} from (read only) sender address of this transaction, mathematically derived from other parameters.
         * @name from
         * @memberof Transaction
         */
        Object.defineProperty(this, 'from', {
          enumerable: true,
          configurable: true,
          get: this.getSenderAddress.bind(this)
        })
  }

  /**
   * Computes a keccak hash of the serialized tx
   * @return {Buffer}
   */
  _msgHash () {
    let item = ''
    let items = this.raw.slice(0, 4)
    for(let i=0; i<items.length; i++){
      item += items[i].toString("hex")
    }
    
    let itemResult = Buffer.from(item, 'hex')
    return yggUtil.keccak(itemResult)
  }

  /**
   * serialize signature
   * @return {hex string}
   */
  hexSignature () {
    var items = ""
    for(i = 4; i<this.raw.length; i++){
      items += this.raw[i].toString("hex")
    }

    return items
   }

  /**
   * generate serialize transaction information
   * @return {Object}
   */
  serialize (body) {
    // TODO: data exception handling 
    let bodyJson = jsonToArrayString(body);
 
    const headerData = {
      "timestamp": this.raw[0].toString('hex'),
      "nonce": this.raw[1].toString('hex'),
      "bodyHash": this.raw[2].toString('hex'),
      "bodyLength": this.raw[3].toString('hex')
    }

    const adminTxData = {
      "header": jsonToString(headerData),
      "signature": this.vrs(),
      "body": bodyJson
    }
    return adminTxData
 }

  bodyHashHex (bodyJson) {
    return yggUtil.keccak(Buffer.from(bodyJson)).toString("hex");
  }

  /**
   * returns the sender's address
   * @return {Buffer}
   */
  getSenderAddress () {
    if (this._from) {
      return this._from
    }
    const pubkey = this.getSenderPublicKey()
    this._from = yggUtil.publicToAddress(pubkey)
    return this._from
  }

  /**
   * returns the public key of the sender
   * @return {Buffer}
   */
  getSenderPublicKey () {
    if (!this._senderPubKey || !this._senderPubKey.length) {
      if (!this.verifySignature()) throw new Error('Invalid Signature')
    }
    return this._senderPubKey
  }

  /**
   * Determines if the signature is valid
   * @return {Boolean}
   */
  verifySignature () {
    const msg = this.msgHash(false)

    try {
      let v = yggUtil.bufferToInt(this.v)
      this._senderPubKey = yggUtil.ecrecover(msg, v, this.r, this.s)
    } catch (e) {
      return false
    }

    return !!this._senderPubKey
  }

  /**
   * sign a transaction with a given a private key
   * @param {Buffer} privateKey
   */
  sign (privateKey) {
    const msg = this.msgHash(false)
    const sig = yggUtil.ecsign(msg, privateKey)
    Object.assign(this, sig)
    return sig
  }
}

module.exports = Transaction
