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

    let getTransaction = new Method({
        name: 'getTransaction',
        call: 'ygg_getTransactionByHash',
        params: 1,
        outputFormatter: formatters.outputTransactionFormatter
    });

    let getTransactionFromBlock = new Method({
        name: 'getTransactionFromBlock',
        call: transactionFromBlockCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, utils.toHex],
        outputFormatter: formatters.outputTransactionFormatter
    });

    let getTransactionReceipt = new Method({
        name: 'getTransactionReceipt',
        call: 'ygg_getTransactionReceipt',
        params: 1,
        outputFormatter: formatters.outputTransactionReceiptFormatter
    });

    let approveBody = new Method({
        name: 'approveBody',
        call: 'approve',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputBigNumberFormatter]
    });
    
    let transferFromBody = new Method({
        name: 'transferFromBody',
        call: 'transferfrom',
        params: 3,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputAddressFormatter, formatters.inputBigNumberFormatter]
    });

    let transferBody = new Method({
        name: 'transferBody',
        call: 'transfer',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputBigNumberFormatter]
    });

    let sendTransaction = new Method({
        name: 'sendTransaction',
        call: 'sendTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter]
    });

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

    let totalSupply = new Method({
        name: 'totalSupply',
        call: 'totalSupply',
        params: 1,
        inputFormatter: [formatters.inputAddressFormatter]
    });

    let getBalance = new Method({
        name: 'getBalance',
        call: 'balanceOf',
        params: 2,
        inputFormatter: [formatters.inputBranchIdFormatter, formatters.inputAddressFormatter],
        outputFormatter: formatters.outputBigNumberFormatter
    });

    let allowance = new Method({
        name: 'allowance',
        call: 'allowance',
        params: 3,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputAddressFormatter, formatters.inputAddressFormatter]
    });
    
    return [
        getBalance,
        getBranches,
        getBlock,
        getTransaction,
        getTransactionFromBlock,
        getTransactionReceipt,
        transferBody,
        transferFromBody,
        approveBody,
        sendTransaction,
        branch,
        plant,
        unregister,
        branchId,
        specification,
        totalSupply,
        allowance
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
