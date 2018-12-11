'use strict'

const yggUtil = require('../utils')
const BN = yggUtil.BN
const { dataToJson, dataToJsonNonArray } = require('../../utils/index')
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
 * @param {Buffer | Array | Object} data a transaction can be initiailized with either a buffer containing the RLP serialized transaction or an array of buffers relating to each of the tx Properties, listed in order below in the exmple.
 *
 * Or lastly an Object containing the Properties of the transaction like in the Usage example.
 *
 * For Object and Arrays each of the elements can either be a Buffer, a hex-prefixed (0x) String , Number, or an object wit a toBuffer method such as Bignum
 *
 * @property {Buffer} raw The raw rlp encoded transaction
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
         * Returns the rlp encoding of the transaction
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
  msgHash () {
    let items
    let items = this.raw.slice(0, 4)
    for(let i=0; i<items.length; i++){
      item += items[i].toString("hex")
    }
    
    let itemResult = Buffer.from(item, 'hex')
    this._headerHash = item;
    return yggUtil.keccak(itemResult)
  }

  headerHash () {
    return this._headerHash
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
    let bodyJson = dataToJson(body);
 
    const headerData = {
      "timestamp": this.raw[0].toString('hex'),
      "nonce": this.raw[1].toString('hex'),
      "bodyHash": this.raw[2].toString('hex'),
      "bodyLength": this.raw[3].toString('hex')
    }

    const adminTxData = {
      "header": dataToJsonNonArray(headerData),
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

  /**
   * validates the signature and checks to see if it has enough gas
   * @param {Boolean} [stringError=false] whether to return a string with a dscription of why the validation failed or return a Bloolean
   * @return {Boolean|String}
   */
  validate (stringError) {
    const errors = []
    if (!this.verifySignature()) {
      errors.push('Invalid Signature')
    }

    if (stringError === undefined || stringError === false) {
      return errors.length === 0
    } else {
      return errors.join(' ')
    }
  }
}

module.exports = Transaction
