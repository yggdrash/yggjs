'use strict'

const { expect } = require('chai')
const Transaction = require('../lib/v2/Transaction')
const sinon = require('sinon')

const dummy = {
  branchId: '91b29a1453258d72ca6fbbcabb8dca10cca944fb',
  contractVersion: '58d1e024502844b4d1ac0ff4a9e57c7228a6e50a',
  methodName: 'transfer',
  params: {
    to: '1a0cdead3d1d1dbeef848fef9053b4f0ae06db9e',
    amount: '1000'
  },
  privateKey: '310d08df73d4bc989ea82a7002ceb6f60896ebc80feeeb80c04b6a27f9b4985e'
}

describe('Transaction', () => {
  let tx;

  beforeEach(() => {
    tx = new Transaction(dummy.branchId, dummy.contractVersion, dummy.methodName, dummy.params)
  })

  describe('new Transaction()', () => {
    it('should throw an error when invalid parameters.', () => {
      expect(() => new Transaction(1,1,1,1)).to.throw(TypeError)
      expect(() => new Transaction(dummy.branchId, dummy.contractVersion, dummy.methodName, dummy.params))
        .to.not.throw()
    })
  })

  describe('sign()', () => {
    it('should throw an error when it is called twice.', () => {
      tx.sign(dummy.privateKey)
      expect(() => tx.sign(dummy.privateKey)).to.throw('Already signed.')
    })
  })

  describe('send()', () => {
    beforeEach(() => {
      tx.sign(dummy.privateKey)
    })

    it('should return promise included transaction id', () => {
      let callback = sinon.fake.resolves(
        'c3c79ac8f082f7d6432bc42878ea2b6c3e4d41b7f4cf60b71c20447fe51ff51c')
      expect(callback()).to.be.a('promise')
      callback().then(res => {
        expect(res).to.have.lengthOf(64)
      })
    })
  })
})
