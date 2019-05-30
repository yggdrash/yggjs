const Buffer = require('safe-buffer').Buffer
const Yggdrash = require('../..')
const { Transaction } = require('../..')
const Wallet = require('../../lib/local/wallet')
const { expect } = require('chai')

describe('Version 1.0', () => {
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

    it('Transaction', () => {
        txHeader["chain"] = "0xad8dd763a9e8e39aedd8a17690959b4981b8f8b2";
        txHeader["timeStamp"] = "0xad8dd763a9e8e39aedd8a17690959b4981b8f8b2";
        // wallet check
        let password = 'Aa1234567890!';
        const issuerKeyStore = require('./resources/issuerkey.json');
        const issuerWallet = Wallet.fromKeystore(issuerKeyStore, password)
        expect(issuerWallet.getAddressString()).to.equal("4e5cbe1d0db35add81e7f2840eeb250b5b469161")

        const receiverKeyStore = require('./resources/receiverkey.json')
        const receiverWallet = Wallet.fromKeystore(receiverKeyStore, password)
        expect(receiverWallet.getAddressString()).to.equal("101167aaf090581b91c08480f6e559acdd9a3ddd")

        const validatorKeyStore = require('./resources/validatorkey.json')
        const validatorWallet = Wallet.fromKeystore(validatorKeyStore, password)
        expect(validatorWallet.getAddressString()).to.equal("ffcbff030ecfa17628abdd0ff1990be003da35a2")

        // TODO check branchId
        const branchId = '9602d87f7e7cb66dbbc4db9e488974378e9d615c';
        const contractVersion = '1319aef6bf061927e9e26fb19da1020f73e01588';

        // TODO issue propose transaction to issuerWallet
        // Step 1
        let method = 'issuePropose'
        let propose = {
            receiveAddress : "4e5cbe1d0db35add81e7f2840eeb250b5b469161",
            receiveAsset : "1000000000000000000",
            receiveChainId : -1,
            senderAddress : "101167aaf090581b91c08480f6e559acdd9a3ddd",
            networkBlockHeight : 0,
            proposeType : 1,
            inputData : null,
            stakeYeed : "4000000000",
            blockHeight : 1000000,
            fee : "400000000"
        }

        let issueTx = new Transaction(branchId, contractVersion, method, propose)
        console.log(issuerWallet.getAddressString())
        issueTx.sign(issuerWallet.getPrivateKey())
        console.log(JSON.stringify(issueTx, null, 2))
        console.log(issueTx.getRawTransaction())
        console.log(issueTx._createMessageHash().toString("hex"))
        // ad8dd763a9e8e39aedd8a17690959b4981b8f8b2000000000000000000000000000000001556168953047ec2150781ee0b27a4922459d3490b790553820fef1b6ecb67446eb3a9cc2d6db4121b09fb02de3ac1102b2a83a5345e2c9065b9e1eb89367f83c852cd3e5975766d855aca32b0b537025acbeb8ba17d9fa1d71cdd4283e7045d60d6a3e41d1e25123a5b7b22636f6e747261637456657273696f6e223a2230366564313864396538653738393761653261653131303835646339353436366534363162306536222c226d6574686f64223a22697373756550726f706f7365222c22706172616d223a7b227265636569766541646472657373223a2234653563626531643064623335616464383165376632383430656562323530623562343639313631222c22726563656976654173736574223a2231303030303030303030303030303030303030222c2272656365697665436861696e4964223a312c2273656e64657241646472657373223a2231303131363761616630393035383162393163303834383066366535353961636464396133646464222c226e6574776f726b426c6f636b486569676874223a302c2270726f706f736554797065223a312c22696e70757444617461223a6e756c6c2c227374616b6559656564223a2231303030303030303030303030303030303030222c22626c6f636b486569676874223a313030303030302c22666565223a22313030303030303030303030303030303030227d7d5d


        // TODO Process ethereum get raw transaction




        // propose description
        // in Ethereum network, 1ETH send to 4e5cbe1d0db35add81e7f2840eeb250b5b469161 from 101167aaf090581b91c08480f6e559acdd9a3ddd,
        // I will pay for 1 YEED To 101167aaf090581b91c08480f6e559acdd9a3ddd
        // and fee is 0.1 YEED (10%)
        // This propose will expired in YGGDRASH NETWORK block height 1000000

        // TODO issue propose process transaction to receiverWallet
        // Step 2
        // let propose Id
        method = 'processPropose'
        let proposeProcess = {
            proposeId : "8e8f91ceb9cda24feda1402d6da029ffd8bc0d5517211701dd4cba2397d605ab",
            rawTransaction : "0xf86c018503b9aca000825208944e5cbe1d0db35add81e7f2840eeb250b5b469161880de0b6b3a7640000802aa0b9316259b129351850526d7a028e3d5b54922935616232cad839b2f5e9ef302fa0046f8dd7b31ea081369ab0f2168624f84407a5d0fd17f47a931dd29ef1bbe4f6",
            fee : "10000"
        }
        let processTx = new Transaction(branchId, contractVersion, method, proposeProcess)
        processTx.sign(receiverWallet.getPrivateKey())
        console.log(JSON.stringify(processTx, null, 2))
        // propose process description

        // TODO issue confirm transaction to validator wallet
        // Step 3
        method = 'transactionConfirm'
        // get transction receipt
        let confirm = {
            txConfirmId : '579bc1ffa61a279a4964604d40064b84a87a9aa525d17c2aac16e88ac4989740',
            status : 2,
            blockHeight : 5475964,
            index : 0,
            lastBlockHeight : 5475994
        }
        let confirmTx = new Transaction(branchId, contractVersion, method, confirm)
        confirmTx.sign(validatorWallet.getPrivateKey())
        console.log(JSON.stringify(confirmTx, null, 2))

        console.log(issuerWallet.getPrivateKeyString())
        console.log(receiverWallet.getPrivateKeyString())
        console.log(validatorWallet.getPrivateKeyString())
    })
})