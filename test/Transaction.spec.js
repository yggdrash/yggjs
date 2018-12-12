'use strict'

import 'chai/register-should';
import Transaction from "../lib/v2/Transaction"
import * as fixture from './fixture/Transaction.fixture'
import { Buffer } from 'safe-buffer'

describe('Transaction', () => {
  let tx;

  beforeEach(() => {
    tx = new Transaction(fixture.branchId, 'transfer', fixture.params)
  })

  it('should be filled with body & bodyLength & chain when object created.', () => {
    should.exist(tx)
    tx.should.have.all.keys('chain', 'body', 'bodyLength')
    tx.body.should.equal(
      '[{"method":"transfer","params":' +
      `[{"address":"${fixture.params.address}","amount":"${fixture.params.amount}"}]}]`)
  })

  it('hashingBody()', () => {
    tx.hashingBody()
    tx.bodyHash.should.equal('e895380ce95a51273d08ef189b8fea3b42f22c20f35ab4a0abff4bc569f94597')
  })

  it('createRawData()', () => {
    tx.prepare()
    let raw = tx.createRawData()
    raw.should.equal(fixture.raw)
  })

  it('createMessageHash()', () => {
    tx.prepare()
    tx.createMessageHash().equals(Buffer.from(fixture.messageHash, 'hex'))
      .should.equal(true)
  })

  it('sign()', () => {
    tx.sign()
    should.exist(tx.signature)
    tx.signature.should.equal(fixture.signature)
  })

  it.skip('should be completed when signed ', () => {
    tx.sign(fixture.privateKey)
    tx.should.have.all.keys(
      'timestamp', 'bodyLength', 'body', 'author', 'hash', 'chain', 'type', 'version',
      'bodyHash', 'signature'
    )
  })
})
