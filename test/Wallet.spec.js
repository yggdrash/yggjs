'use strict'

import 'chai/register-should';
import { expect } from 'chai'
import ksHelper from '../lib/local/wallet/generation'
import sinon from 'sinon'

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

// const { address, keystoreData } = ygg.wallet.create(password)
// const pk  = ygg.wallet.getPrivateKey(keystoreData, password)
// const { address, keystoreData } = ygg.wallet.import(privateKey, password)


describe('Wallet', () => {
  beforeEach(() => {

  })

  describe('new wallet()', () => {
    it('create account', () => {
        let { address, keystoreData } = ksHelper.create(dummy.password)
    })
    it('import account', () => {
      let { address, keystoreData } = ksHelper.import(dummy.privateKey, dummy.password)
    })
    it('get pk', () => {
      let pk = ksHelper.getPrivateKey(dummy.keystore, dummy.password)
    })
  })
})
