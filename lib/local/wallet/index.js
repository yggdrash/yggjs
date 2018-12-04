const _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

const { Buffer } = require('safe-buffer')
const yggUtil = require('../utils');
const crypto = require('crypto');
const { keccak } = require('../../utils/utils');
const scrypt = require('scrypt-async');
const uuidv4 = require('uuid/v4');
const bs58check = require('bs58check');

function assert(val, msg) {
  if (!val) {
    throw new Error(msg || 'Assertion failed');
  }
}

var Wallet = function Wallet(priv, pub) {
  if (priv && pub) {
    throw new Error('Cannot supply both a private and a public key to the constructor');
  }

  if (priv && !yggUtil.isValidPrivate(priv)) {
    throw new Error('Private key does not satisfy the curve requirements (ie. it is invalid)');
  }

  if (pub && !yggUtil.isValidPublic(pub)) {
    throw new Error('Invalid public key');
  }

  this._privKey = priv;
  this._pubKey = pub;
};

Object.defineProperty(Wallet.prototype, 'privKey', {
  get: function get() {
    assert(this._privKey, 'This is a public key only wallet');
    return this._privKey;
  }
});

Object.defineProperty(Wallet.prototype, 'pubKey', {
  get: function get() {
    if (!this._pubKey) {
      this._pubKey = yggUtil.privateToPublic(this.privKey);
    }
    return this._pubKey;
  }
});

Wallet.generate = function (icapDirect) {
  if (icapDirect) {
    var max = new yggUtil.BN('088f924eeceeda7fe92e1f5b0fffffffffffffff', 16);
    while (true) {
      var privKey = crypto.randomBytes(32);
      if (new yggUtil.BN(yggUtil.privateToAddress(privKey)).lte(max)) {
        return new Wallet(privKey);
      }
    }
  } else {
    return new Wallet(crypto.randomBytes(32));
  }
};

Wallet.import = function (privKey) {
    return new Wallet(Buffer.from(privKey, 'hex'))
};

Wallet.generateVanityAddress = function (pattern) {
  if ((typeof pattern === 'undefined' ? 'undefined' : _typeof(pattern)) !== 'object') {
    pattern = new RegExp(pattern);
  }

  while (true) {
    let privKey = crypto.randomBytes(32);
    let address = yggUtil.privateToAddress(privKey);

    if (pattern.test(address.toString('hex'))) {
      return new Wallet(privKey);
    }
  }
};

Wallet.prototype.getPrivateKey = function () {
  return this.privKey;
};

Wallet.prototype.getPrivateKeyString = function () {
  return yggUtil.bufferToHex(this.getPrivateKey());
};

Wallet.prototype.getPublicKey = function () {
  return this.pubKey;
};

Wallet.prototype.getPublicKeyString = function () {
  return yggUtil.bufferToHex(this.getPublicKey());
};

Wallet.prototype.getAddress = function () {
  return yggUtil.publicToAddress(this.pubKey);
};

Wallet.prototype.getAddressString = function () {
  return yggUtil.bufferToHex(this.getAddress());
};

Wallet.prototype.getChecksumAddressString = function () {
  return yggUtil.toChecksumAddress(this.getAddressString());
};

Wallet.prototype.toKeystore = function (password, opts) {
  assert(this._privKey, 'This is a public key only wallet');

  opts = opts || {};
  let salt = opts.salt || crypto.randomBytes(32);
  let iv = opts.iv || crypto.randomBytes(16);

  let derivedKey;
  let kdf = opts.kdf || 'pbkdf2';
  let kdfparams = {
    dklen: opts.dklen || 32,
    salt: keccak(password)
  };

  if (kdf === 'pbkdf2') {
    kdfparams.c = opts.c || 262144;
    kdfparams.prf = 'hmac-sha256';
    derivedKey = crypto.pbkdf2Sync(Buffer.from(password), kdfparams.salt, kdfparams.c, kdfparams.dklen, 'sha256');
    // console.log('derivedKey', derivedKey.toString('hex'))
  } else if (kdf === 'scrypt') {
    kdfparams.n = opts.n || 262144;
    kdfparams.r = opts.r || 8;
    kdfparams.p = opts.p || 1;
    // derivedKey = scryptsy(Buffer.from(password), salt, kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
    scrypt(Buffer.from(password), salt, {
      N: kdfparams.n,
      r: kdfparams.r,
      p: kdfparams.p,
      dkLen: kdfparams.dklen,
      encoding: 'binary'
    }, function(resultDerivedKey) {
        derivedKey= resultDerivedKey
    });
  } else {
    throw new Error('Unsupported kdf');
  }

  var cipher = crypto.createCipheriv(opts.cipher || 'aes-128-cbc', derivedKey.slice(0, 16), iv);
  // let cipher = crypto.createCipheriv(opts.cipher || 'aes-256-cbc', derivedKey, iv);

  if (!cipher) {
    throw new Error('Unsupported cipher');
  }

  let ciphertext = Buffer.concat([cipher.update(this.privKey), cipher.final()]);
  let mac = yggUtil.sha3(Buffer.concat([derivedKey.slice(16, 32), Buffer.from(ciphertext, 'hex')]));

  return {
    version: 1,
    id: uuidv4({ random: opts.uuid || crypto.randomBytes(16) }),
    address: this.getAddress().toString('hex'),
    crypto: {
      ciphertext: ciphertext.toString('hex'),
      cipherparams: {
        iv: iv.toString('hex')
      },
      cipher: opts.cipher || 'aes-128-cbc',
      kdf: kdf,
      kdfparams: kdfparams,
      mac: mac.toString('hex')
    }
  };
};

Wallet.prototype.toKeystoreString = function (password, opts) {
  return JSON.stringify(this.toV3(password, opts));
};

Wallet.fromPublicKey = function (pub, nonStrict) {
  if (nonStrict) {
    pub = yggUtil.importPublic(pub);
  }
  return new Wallet(null, pub);
};

Wallet.fromExtendedPublicKey = function (pub) {
  assert(pub.slice(0, 4) === 'xpub', 'Not an extended public key');
  pub = bs58check.decode(pub).slice(45);
  return Wallet.fromPublicKey(pub, true);
};

Wallet.fromPrivateKey = function (priv) {
  return new Wallet(priv);
};

Wallet.fromExtendedPrivateKey = function (priv) {
  assert(priv.slice(0, 4) === 'xprv', 'Not an extended private key');
  var tmp = bs58check.decode(priv);
  assert(tmp[45] === 0, 'Invalid extended private key');
  return Wallet.fromPrivateKey(tmp.slice(46));
};

Wallet.fromKeystore = function (input, password, nonStrict) {
  assert(typeof password === 'string');
  let json = (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' ? input : JSON.parse(nonStrict ? input.toLowerCase() : input);
  
  if (json.version !== 1) {
    throw new Error('Not a wallet');
  }

  let derivedKey;
  let kdfparams;
  if (json.crypto.kdf === 'scrypt') {
    kdfparams = json.crypto.kdfparams;
    // derivedKey = scryptsy(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
    scrypt(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), {
      N: kdfparams.n,
      r: kdfparams.r,
      p: kdfparams.p,
      dkLen: kdfparams.dklen,
      encoding: 'binary'
    }, function(resultDerivedKey) {
        derivedKey= resultDerivedKey
    });
  } else if (json.crypto.kdf === 'pbkdf2') {
    kdfparams = json.crypto.kdfparams;

    if (kdfparams.prf !== 'hmac-sha256') {
      throw new Error('Unsupported parameters to PBKDF2');
    }

    derivedKey = crypto.pbkdf2Sync(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256');
  } else {
    throw new Error('Unsupported key derivation scheme');
  }

  let ciphertext = Buffer.from(json.crypto.ciphertext, 'hex');

  let mac = yggUtil.sha3(Buffer.concat([derivedKey.slice(16, 32), ciphertext]));

  if (mac.toString('hex') !== json.crypto.mac) {
    throw new Error('Key derivation failed - possibly wrong passphrase');
  }

  var decipher = crypto.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), Buffer.from(json.crypto.cipherparams.iv, 'hex'));
  // let decipher = crypto.createDecipheriv(json.crypto.cipher, derivedKey, Buffer.from(json.crypto.cipherparams.iv, 'hex'));
  let seed = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  
  return new Wallet(seed);
};

module.exports = Wallet;