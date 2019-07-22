const yggUtil = require('../utils')
const { Buffer } = require('safe-buffer')

/**
 * Creates a new transaction object.
 *
 * @example
 * let txHeaderData = {
      "seed":`0x${keccak(seed.json)}`,
    };
 * var tx = new Transaction(rawTx);
 *
 * @class
 * @param {Buffer | Array | Object} data 

 * @param {Buffer} data.seed seed.json
 * @param {Buffer} data.v EC signature parameter
 * @param {Buffer} data.r EC signature parameter
 * @param {Buffer} data.s EC recovery ID
 * */

class Genesis {
  constructor (data) {
        data = data || {}
          // Define Properties
          const fields = [{
            name: 'seed',
            length: 32,
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
    let itemResult = Buffer.from(this.raw[0], 'hex')
    return itemResult
  }

  /**
   * serialize signature
   * @return {hex string}
   */
  hexSignature () {
    let items = ""
    for(let i = 1; i<this.raw.length; i++){
      items += this.raw[i].toString("hex")
    }
    return items;
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
    const msg = this._msgHash(false)
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
    const msg = this._msgHash(false)
    const sig = yggUtil.ecsign(msg, privateKey)
    Object.assign(this, sig)
    return sig
  }
}

module.exports = Genesis
