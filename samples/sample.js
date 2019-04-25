const Buffer = require('safe-buffer').Buffer
const Yggdrash = require('..')
const { Transaction } = require('..')

const branchId = 'a5f436a66ce5ca5b7dbd6bbf8460701b8cbf0485';

describe('Version 1.0', () => {
  it('Transaction', () => {
    const ygg = new Yggdrash()
    const body = ygg.client.transferBody('2dbe588da70cafe98bd1797119e96165a8e74191', '1000')
    let tx = new ygg.tx(txHeader())
    tx.sign(Buffer.from('310d08df73d4bc989ea82a7002ceb6f60896ebc80feeeb80c04b6a27f9b4985e', 'hex'))
    ygg.client.sendTransaction(tx.serialize(body)).then(res => {
      console.log(res)
    })
  })

  const txHeader = () => {
    return {
      "chain":`0xa5f436a66ce5ca5b7dbd6bbf8460701b8cbf0485`,
      "version":`0x0000000000000000`,
      "type":`0x0000000000000000`,
      "timeStamp":`0x0000016786e00bd8`,
      "bodyHash":`0xe895380ce95a51273d08ef189b8fea3b42f22c20f35ab4a0abff4bc569f94597`,
      "bodyLength":'0x0000000000000069'
    };
  }
})

describe('Version 2.0', () => {
  it('new Transaction()', () => {
    let params = {to: '2dbe588da70cafe98bd1797119e96165a8e74191', amount: '1000'}
    let contractId = ""
    let tx = new Transaction(branchId, contractId, 'transfer', params)
    // tx sign by json wallet

    tx.sign('310d08df73d4bc989ea82a7002ceb6f60896ebc80feeeb80c04b6a27f9b4985e')

      console.debug(tx.getRawTransaction())
      /*
    tx.send().then(res => {
      console.log(res)
    })
    */
  })

  //To Be
  /*
  const YeedBranch = new Branch(branchId)
  YeedBranch.tx('transfer', {to: '2dbe588da70cafe98bd1797119e96165a8e74191', amount: '1000'})
    .sign('310d08df73d4bc989ea82a7002ceb6f60896ebc80feeeb80c04b6a27f9b4985e')
    .send().then(res => {
      console.log(res)
  })
  */
})

