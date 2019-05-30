'use strict'

const { expect } = require('chai')
const ksHelper = require('../lib/local/wallet/generation')
const Wallet = require('../lib/local/wallet')
const sinon = require('sinon')

const dummy = {
  password: 'password',
  address: '3ebd8c7a48acA9a2e39dCa01D0d83e14B7E66F',
  privateKey: '67e32c0e5bbdb38061fa51cf3d8f239ee6c603517711763bf9aa1d5a706df0f5',
  keystore: {
      address: 'fb3ebd8c7a48aca9a2e39dca01d0d83e14b7e66f',
      crypto: {
        ciphertext: 'fa785574b58408c4451c3e8b5b79d1b0c3e3d563ad79b884b0453e6e20708784725b2af234aecf20f5337221f95aacf6',
        cipherparams: { iv: 'cdbbacfed7f921d159157f721f3c3aae' },
        cipher: 'aes-128-cbc',
        kdf: 'pbkdf2',
        kdfparams: {
          dklen: 32,
          salt:
          'bcc41a11f0f9f4c9373a7379cba0a5cb2fb6866cd40f895c949fad4116f5a61f',
          c: 262144,
          prf: 'hmac-sha256'
        },
        mac: 'ead56f83c014e4d3825319f59e8a4f193620bd78d14b113d24f704f64f901be8'
      }
    }
}

const testKey = {
    "address": "101167aaf090581b91c08480f6e559acdd9a3ddd",
    "crypto": {
        "cipher": "aes-128-cbc",
        "cipherparams": {
            "iv": "b07bbbaaa8547c869db901555709237e"
        },
        "ciphertext": "24962c18373831ef1a92ffdcab09a2d63fe95daea7229a160d62165a2e08be081024cef9f0747a4f78a7ee3b85c5a288",
        "kdf": "pbkdf2",
        "kdfparams": {
            "c": 262144,
            "dklen": 32,
            "prf": "hmac-sha256",
            "salt": "9c3c640f622866da13a18235afd485eef17812abab4b78526ce2f962ea431b37"
        },
        "mac": "299662e68256cdb203137e268265a3eae2825ec34bbce5a4860297e4e09eb80f"
    }
}

// const { address, keystoreData } = ygg.wallet.create(password)
// const pk  = ygg.wallet.getPrivateKey(keystoreData, password)
// const { address, keystoreData } = ygg.wallet.import(privateKey, password)


describe('Wallet', () => {
  beforeEach(() => {

  })

  describe('new wallet()', () => {
    it('create account', () => {
        let { address, keystoreData } = ksHelper.create(dummy.password)
        console.debug("address : ", address)
    })
    it('import account', () => {
      let { address, keystoreData } = ksHelper.import(dummy.privateKey, dummy.password)
        console.log("address : ",address)
    })
    it('import by keystore', () => {
      let password = "Aa1234567890!"
      const wallet = Wallet.fromKeystore(testKey, password)
        expect(wallet.getAddress().toString("hex")).to.equal(testKey.address)
        let wallet2 = ksHelper.fromPrivateKey(wallet.getPrivateKey().toString("hex"))
        expect(wallet2.getAddressString()).to.equal(wallet.getAddressString())
        expect(wallet2.getPrivateKeyString()).to.equal(wallet.getPrivateKeyString())

    })
    it('get pk', () => {
      let pk = ksHelper.getPrivateKey(dummy.keystore, dummy.password)
    })
  })
})
