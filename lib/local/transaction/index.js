'use strict'

const yggUtil = require('../utils')
const BN = yggUtil.BN
const { dataToJson } = require('../../utils/index')
const { Buffer } = require('safe-buffer')

// secp256k1n/2
const N_DIV_2 = new BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16)

/**
 * Creates a new transaction object.
 *
 * @example
 * let txHeaderData = {
 *    "chain":`0x${chain}`, 
 *    "version":`0x${version}`, 
 *    "type":`0x${type}`, 
 *    "timeStamp":`0x${timestamp}`, 
 *    "bodyHash":`0x${bodyHashHex}`,
 *    "bodyLength":`0x${bodyLengthHex}`
 * }
 * var tx = new Transaction(txHeaderData)
 *
 * @class
 * @param {Buffer | Array | Object} data a transaction can be initiailized with either a buffer containing the RLP serialized transaction or an array of buffers relating to each of the tx Properties, listed in order below in the exmple.
 *
 * Or lastly an Object containing the Properties of the transaction like in the Usage example.
 *
 * For Object and Arrays each of the elements can either be a Buffer, a hex-prefixed (0x) String , Number, or an object with a toBuffer method such as Bignum
 *
 * @property {Buffer} raw The raw rlp encoded transaction
 * @param {Buffer} data.chain branch ID
 * @param {Buffer} data.version this brnach version
 * @param {Buffer} data.type this branch type
 * @param {Buffer} data.timeStamp timestamp
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
          name: 'chain',
          allowZero: true,
          length: 20,
          default: Buffer.from([])
        }, {
          name: 'version',
          length: 8,
          allowZero: true,
          default: Buffer.from([])
        }, {
          name: 'type',
          length: 8,
          allowZero: true,
          default: Buffer.from([])
        }, {
          name: 'timeStamp',
          length: 8,
          allowZero: true,
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
    let items = this.raw.slice(0, 6)
    for(let i=0; i<items.length; i++){
      item += items[i].toString("hex")
    }
    
    let itemResult = Buffer.from(item, 'hex')
    this._headerHash = item
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
    let items = ""
    for(let i = 6; i<this.raw.length; i++){
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
    let bodyJson = dataToJson(body)
      
    const txData = {
        "timestamp": parseInt(this.raw[3].toString('hex'), 16),
        "bodyLength": bodyJson.length,
        "body": bodyJson,
        "author": yggUtil.pubToAddress(this.getSenderPublicKey(), true).toString('hex').toLocaleLowerCase(),
        "hash": this.getTxHash(),
        "chain": this.raw[0].toString('hex'),
        "type": `0000000000000000`,
        "version": `0000000000000000`,
        "bodyHash": this.bodyHashHex(bodyJson),
        "signature": this.hexSignature(),
    }
    return txData
 }

  bodyHashHex (bodyJson) {
    return yggUtil.keccak(Buffer.from(bodyJson)).toString("hex")
  }

   /**
   * serialize signature
   * @return {hex string}
   */
  getTxHash () {
    var items = ""
    for(var key in this.raw){
      items += this.raw[key].toString("hex")
    }
    return yggUtil.keccak(Buffer.from(items, 'hex')).toString("hex")
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
    // All transaction signatures whose s-value is greater than secp256k1n/2 are considered invalid.
    if (new BN(this.s).cmp(N_DIV_2) === 1) {
      return false
    }

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
    const msg = this.msgHash()
    const sig = yggUtil.ecsign(msg, privateKey)
    Object.assign(this, sig)
    return sig
  }
  /**
   * the up front amount that an account must have for this transaction to be valid
   * @return {BN}
   */
  getUpfrontCost () {
    return new BN(this.value)
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
