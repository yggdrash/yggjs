const Buffer = require('safe-buffer').Buffer
const Yggdrash = require('../..')
const { Transaction } = require('../..')
const Wallet = require('../../lib/local/wallet')
const { expect } = require('chai')

describe('Version 1.0', () => {
    it('Transaction', () => {
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
        const branchId = '';
        const contractVersion = '';

        // TODO issue propose transaction to issuerWallet
        // Step 1
        let method = 'issuePropose'
        let propose = {
            receiveAddress : "4e5cbe1d0db35add81e7f2840eeb250b5b469161",
            receiveAsset : "1000000000000000000",
            receiveChainId : 1,
            senderAddress : "101167aaf090581b91c08480f6e559acdd9a3ddd",
            networkBlockHeight : 0,
            proposeType : 1,
            inputData : null,
            stakeYeed : "1000000000000000000",
            blockHeight : 1000000,
            fee : "100000000000000000"
        }

        let issueTx = new Transaction(branchId, contractVersion, method, propose)
        issueTx.sign(issuerWallet.getPrivateKey())
        console.log(JSON.stringify(issueTx, null, 2))

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
            proposeId : "",
            rawTransaction : "",
            fee : ""
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
            txConfirmId : '',
            status : '',
            blockHeight : '',
            index : '',
            lastBlockHeight : ''
        }
        let confirmTx = new Transaction(branchId, contractVersion, method, confirm)
        confirmTx.sign(validatorWallet.getPrivateKey())
        console.log(JSON.stringify(confirmTx, null, 2))
        console.log(JSON.stringify(JSON.parse(confirmTx.body), null, 2))

    })
})