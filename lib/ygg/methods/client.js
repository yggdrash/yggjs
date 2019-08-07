"use strict";

const formatters = require('../formatters');
const utils = require('../../utils/index');
const Method = require('../method');
const Property = require('../property');

var blockCall = function (args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? "ygg_getBlockByHash" : "ygg_getBlockByNumber";
};

var transactionFromBlockCall = function (args) {
    return (utils.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'ygg_getTransactionByBlockHashAndIndex' : 'ygg_getTransactionByBlockNumberAndIndex';
};

function Yggjs(ygg) {
    this._requestManager = ygg._requestManager;

    var self = this;
    
    methods().forEach(method => {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });

    properties().forEach(properties => {
        properties.attachToObject(self);
        properties.setRequestManager(self._requestManager);
    });
}

var methods = function () {
    let getBranches = new Method({
        name: 'getBranches',
        call: 'getBranches'
    });

    let getBlock = new Method({
        name: 'getBlock',
        call: blockCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, function (val) { return !!val; }],
        outputFormatter: formatters.outputBlockFormatter
    });


    let getTransactionFromBlock = new Method({
        name: 'getTransactionFromBlock',
        call: transactionFromBlockCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, utils.toHex],
        outputFormatter: formatters.outputTransactionFormatter
    });

    let getTransaction = new Method({
        name: 'getTransaction',
        call: 'getTransactionByHash',
        params: 2,
        inputFormatter: [formatters.inputBranchIdFormatter, formatters.inputTransactionFormatter],
        outputFormatter: formatters.outputTransactionFormatter
    });

    let getTransactionReceipt = new Method({
        name: 'getTransactionReceipt',
        call: 'getTransactionReceipt',
        params: 2,
        inputFormatter: [formatters.inputBranchIdFormatter, formatters.inputTransactionFormatter],
        outputFormatter: formatters.outputTransactionReceiptFormatter
    });

    let getLogs = new Method({
        name: 'getLogs',
        call: 'getLogs',
        params: 3,
        inputFormatter: [formatters.inputBranchIdFormatter, formatters.numberFormatter, formatters.numberFormatter]
    });

    let fliterLogs = new Method({
        name: 'fliterLogs',
        call: 'fliterLogs',
        params: 4,
        inputFormatter: [formatters.inputBranchIdFormatter, formatters.inputStringFormatter, formatters.numberFormatter, formatters.numberFormatter]
    });

    let approveBody = new Method({
        name: 'approveBody',
        call: 'approve',
        params: 3,
        inputFormatter: [formatters.inputBranchIdFormatter, formatters.inputAddressFormatter, formatters.inputBigNumberFormatter]
    });
    
    let transferFromBody = new Method({
        name: 'transferFromBody',
        call: 'transferFrom',
        params: 3,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputAddressFormatter, formatters.inputBigNumberFormatter]
    });

    let transferBody = new Method({
        name: 'transferBody',
        call: 'transfer',
        params: 3,
        inputFormatter: [formatters.inputStringFormatter, formatters.inputAddressFormatter, formatters.inputBigNumberFormatter]
    });

    let versioningBody = new Method({
        name: 'versioningBody',
        call: 'versioning'
    });

    let sendTransaction = new Method({
        name: 'sendTransaction',
        call: 'sendTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter]
    });

    let sendRawTransaction = new Method({
        name: 'sendRawTransaction',
        call: 'sendRawTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter]
    })

    let branch = new Method({
        name: 'branch',
        call: 'create',
        params: 1,
        inputFormatter: [formatters.inputSeedFormatter]
    });

    let branchId = new Method({
        name: 'branchId',
        call: 'branchId',
        params: 1,
        inputFormatter: [formatters.inputBranchIdFormatter]
    });

    let plant = new Method({
        name: 'plant',
        call: 'ygg_plant',
        params: 1,
        inputFormatter: [formatters.inputBranchRegisterFormatter]
    });

    let unregister = new Method({
        name: 'unregister',
        call: 'ygg_unregister',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, null]
    });

    let specification = new Method({
        name: 'specification',
        call: 'specification',
        params: 1,
        inputFormatter: [formatters.inputAddressFormatter]
    });
    /* Remove */
    let totalSupply = new Method({
        name: 'totalSupply',
        call: 'totalSupply',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputAddressFormatter]
    });

    let getBalance = new Method({
        name: 'getBalance',
        call: 'balanceOf',
        params: 3,
        inputFormatter: [formatters.inputBranchIdFormatter, formatters.inputBranchIdFormatter, formatters.inputAddressFormatter],
        outputFormatter: formatters.outputBigNumberFormatter
    });

    let allowance = new Method({
        name: 'allowance',
        call: 'allowance',
        params: 3,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputAddressFormatter, formatters.inputAddressFormatter]
    });
    
    let getContracts = new Method({
        name: 'getContracts',
        call: 'getContracts'
    });

    let getMethod = new Method({
        name: 'getMethod',
        call: 'getMethod',
        params: 1,
        inputFormatter: [formatters.inputAddressFormatter]
    });

    let feeState = new Method({
        name: 'feeState',
        call: 'feeState',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputStringFormatter]
    });


    let faucet = new Method({
        name: 'faucet',
        call: 'faucet',
        params: 1,
        inputFormatter: [formatters.inputStringFormatter]
    });

    let queryPropose = new Method({
        name: 'queryPropose',
        call: 'queryPropose',
        params: 3,
        inputFormatter: [formatters.inputBranchIdFormatter, formatters.inputBranchIdFormatter, formatters.inputTransactionFormatter],
    });

    let queryTransactionConfirm = new Method({
        name: 'queryTransactionConfirm',
        call: 'queryTransactionConfirm',
        params: 3,
        inputFormatter: [formatters.inputBranchIdFormatter, formatters.inputBranchIdFormatter, formatters.inputTransactionFormatter],
    });

    let transactionConfirm = new Method({
        name: 'transactionConfirm',
        call: 'transactionConfirm',
        params: 6,
        inputFormatter: [formatters.inputStringFormatter, formatters.inputTransactionFormatter, formatters.numberFormatter, formatters.numberFormatter, formatters.numberFormatter, formatters.numberFormatter],
    });

    let curIndex = new Method({
        name: 'curIndex',
        call: 'curIndex',
        params: 1,
        inputFormatter: [formatters.inputBranchIdFormatter]
    });

    return [
        getBalance,
        getBranches,
        getBlock,
        getLogs,
        getTransaction,
        getTransactionFromBlock,
        getTransactionReceipt,
        transferBody,
        transferFromBody,
        approveBody,
        sendTransaction,
        sendRawTransaction,
        branch,
        plant,
        unregister,
        branchId,
        specification,
        totalSupply,
        allowance,
        getContracts,
        getMethod,
        feeState,
        versioningBody,
        fliterLogs,
        faucet,
        queryPropose,
        curIndex,
        transactionConfirm,
        queryTransactionConfirm
    ];
};


var properties = function () {
    return [
        new Property({
            name: 'coinbase',
            getter: 'ygg_coinbase'
        }),
        new Property({
            name: 'syncing',
            getter: 'ygg_syncing',
            outputFormatter: formatters.outputSyncingFormatter
        }),
        new Property({
            name: 'accounts',
            getter: 'ygg_accounts'
        }),
        new Property({
            name: 'blockNumber',
            getter: 'ygg_blockNumber',
            outputFormatter: utils.toDecimal
        })
    ];
};

module.exports = Yggjs;
