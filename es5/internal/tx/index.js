'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var yggUtil = require('yggjs-utils');
var BN = yggUtil.BN;

var _require = require('../../utils/utils'),
    dataToJson = _require.dataToJson;

// secp256k1n/2


var N_DIV_2 = new BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16);
var _headerHash = "";
/**
 * Creates a new transaction object.
 *
 * @example
 * let txHeaderData = {
      "chain":`0x${chain}`,
      "version":`0x${version}`,
      "type":`0x${type}`,
      "timeStamp":`0x${timestamp}`,
      "bodyHash":`0x${bodyHashHex}`,
      "bodyLength":`0x${bodyLengthHex}`
    };
 * var tx = new Transaction(rawTx);
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
 * @param {Buffer} data.bodyHashHex body hash to sha3 
 * @param {Buffer} data.bodyLength body length
 * @param {Buffer} data.v EC signature parameter
 * @param {Buffer} data.r EC signature parameter
 * @param {Buffer} data.s EC recovery ID
 * */

var Transaction = function () {
  function Transaction(data) {
    _classCallCheck(this, Transaction);

    data = data || {};
    // Define Properties
    var fields = [{
      name: 'chain',
      allowZero: true,
      length: 20,
      default: new Buffer([])
    }, {
      name: 'version',
      length: 8,
      allowZero: true,
      default: new Buffer([])
    }, {
      name: 'type',
      length: 8,
      allowZero: true,
      default: new Buffer([])
    }, {
      name: 'timeStamp',
      length: 8,
      allowZero: true,
      default: new Buffer([])
    }, {
      name: 'bodyHash',
      length: 32,
      allowLess: true,
      default: new Buffer([])
    }, {
      name: 'bodyLength',
      length: 8,
      allowZero: true,
      default: new Buffer([])
    }, {
      name: 'v',
      allowZero: true,
      default: new Buffer([0x1c])
    }, {
      name: 'r',
      length: 32,
      allowZero: true,
      allowLess: true,
      default: new Buffer([])
    }, {
      name: 's',
      length: 32,
      allowZero: true,
      allowLess: true,
      default: new Buffer([])
    }];

    /**
     * Returns the rlp encoding of the transaction
     * @method serialize
     * @return {Buffer}
     * @memberof Transaction
     * @name serialize
     */
    // attached serialize
    yggUtil.defineProperties(this, fields, data);

    /**
     * @property {Buffer} from (read only) sender address of this transaction, mathematically derived from other parameters.
     * @name from
     * @memberof Transaction
     */
    Object.defineProperty(this, 'from', {
      enumerable: true,
      configurable: true,
      get: this.getSenderAddress.bind(this)
    });

    this._homestead = true;
  }

  /**
   * Computes a sha3-256 hash of the serialized tx
   * @param {Boolean} [includeSignature=true] whether or not to inculde the signature
   * @return {Buffer}
   */


  _createClass(Transaction, [{
    key: 'hash',
    value: function hash(includeSignature) {
      if (includeSignature === undefined) includeSignature = true;

      var items = void 0;
      var item = "";

      if (includeSignature) {
        items = this.raw;
      } else {
        items = this.raw.slice(0, 6);
      }
      for (var i = 0; i < items.length; i++) {
        item += items[i].toString("hex");
      }
      var itemResult = Buffer.from(item, 'hex');
      _headerHash = item;
      return yggUtil.sha3(itemResult);
    }
  }, {
    key: 'headerHash',
    value: function headerHash() {
      return _headerHash;
    }

    /**
     * serialize signature
     * @return {hex string}
     */

  }, {
    key: 'vrs',
    value: function vrs() {
      var items = "";
      for (var i = 6; i < this.raw.length; i++) {
        items += this.raw[i].toString("hex");
      }
      return items;
    }

    /**
     * generate serialize transaction information
     * @return {Object}
     */

  }, {
    key: 'serialize',
    value: function serialize(body, branchId) {
      var timestamp = Math.round(new Date().getTime() / 1000);
      // TODO: data exception handling 

      var bodyJson = dataToJson(body);

      var txData = {
        "timestamp": timestamp,
        "bodyLength": bodyJson.length,
        "body": bodyJson,
        "author": yggUtil.pubToAddress(this.getSenderPublicKey(), true).toString('hex').toLocaleLowerCase(),
        "hash": this.getTxHash(),
        "chain": branchId ? branchId : "fe7b7c93dd23f78e12ad42650595bc0f874c88f7",
        "type": '0000000000000000',
        "version": '0000000000000000',
        "bodyHash": this.bodyHashHex(bodyJson),
        "signature": this.vrs()
      };

      return txData;
    }
  }, {
    key: 'bodyHashHex',
    value: function bodyHashHex(bodyJson) {
      return yggUtil.sha3(Buffer.from(bodyJson)).toString("hex");
    }

    /**
    * serialize signature
    * @return {hex string}
    */

  }, {
    key: 'getTxHash',
    value: function getTxHash() {
      var items = "";
      for (var key in this.raw) {
        items += this.raw[key].toString("hex");
      }
      return yggUtil.sha3(Buffer.from(items, 'hex')).toString("hex");
    }

    /**
     * returns the sender's address
     * @return {Buffer}
     */

  }, {
    key: 'getSenderAddress',
    value: function getSenderAddress() {
      if (this._from) {
        return this._from;
      }
      var pubkey = this.getSenderPublicKey();
      this._from = yggUtil.publicToAddress(pubkey);
      return this._from;
    }

    /**
     * returns the public key of the sender
     * @return {Buffer}
     */

  }, {
    key: 'getSenderPublicKey',
    value: function getSenderPublicKey() {
      if (!this._senderPubKey || !this._senderPubKey.length) {
        if (!this.verifySignature()) throw new Error('Invalid Signature');
      }
      return this._senderPubKey;
    }

    /**
     * Determines if the signature is valid
     * @return {Boolean}
     */

  }, {
    key: 'verifySignature',
    value: function verifySignature() {
      var msgHash = this.hash(false);
      // All transaction signatures whose s-value is greater than secp256k1n/2 are considered invalid.
      if (this._homestead && new BN(this.s).cmp(N_DIV_2) === 1) {
        return false;
      }

      try {
        var v = yggUtil.bufferToInt(this.v);
        this._senderPubKey = yggUtil.ecrecover(msgHash, v, this.r, this.s);
      } catch (e) {
        return false;
      }

      return !!this._senderPubKey;
    }

    /**
     * sign a transaction with a given a private key
     * @param {Buffer} privateKey
     */

  }, {
    key: 'sign',
    value: function sign(privateKey) {
      var msgHash = this.hash(false);
      var sig = yggUtil.ecsign(msgHash, privateKey);
      Object.assign(this, sig);
      return sig;
    }
    /**
     * the up front amount that an account must have for this transaction to be valid
     * @return {BN}
     */

  }, {
    key: 'getUpfrontCost',
    value: function getUpfrontCost() {
      return new BN(this.value);
    }

    /**
     * validates the signature and checks to see if it has enough gas
     * @param {Boolean} [stringError=false] whether to return a string with a dscription of why the validation failed or return a Bloolean
     * @return {Boolean|String}
     */

  }, {
    key: 'validate',
    value: function validate(stringError) {
      var errors = [];
      if (!this.verifySignature()) {
        errors.push('Invalid Signature');
      }

      if (stringError === undefined || stringError === false) {
        return errors.length === 0;
      } else {
        return errors.join(' ');
      }
    }
  }]);

  return Transaction;
}();

module.exports = Transaction;