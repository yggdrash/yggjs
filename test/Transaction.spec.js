'use strict'

import 'chai/register-should';
import { expect } from 'chai'
import Transaction from "../lib/v2/Transaction"
import sinon from 'sinon'

const dummy = {
  branchId: '91b29a1453258d72ca6fbbcabb8dca10cca944fb',
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
    tx = new Transaction(dummy.branchId, dummy.methodName, dummy.params)
  })

  describe('new Transaction()', () => {
    it('should throw an error when invalid parameters.', () => {

      expect(0).to.equal(1)
    })
  })

  describe('sign()', () => {
    it('should throw an error when it is called twice.', () => {
      tx.sign(dummy.privateKey)
      expect(tx.sign(dummy.privateKey)).to.throw('Already signed.')
    })
  })

  describe('send()', () => {
    beforeEach(() => {
      tx.sign(dummy.privateKey)
    })

    it('jsonRpcClient 로 request 함수를 한번 호출해야 한다.', () => {
      let callback = sinon.fake()

      tx.send(callback)

      expect(callback.called).to.equal(true)
    })

    it('응답으로 transaction id를 가진 Promise 함수를 받아야 한다.', () => {
      let callback = sinon.fake.resolves(
        'c3c79ac8f082f7d6432bc42878ea2b6c3e4d41b7f4cf60b71c20447fe51ff51c')

      expect(callback()).to.be.a('promise')
      callback().then(res => {
        expect(res).to.have.lengthOf(64)
      })
    })
  })
})
