"use strict";

const formatters = require('../formatters');
const utils = require('../../utils/utils');
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

    methods().forEach(function(method) {
        method.attachToObject(self);
        method.setRequestManager(self._requestManager);
    });

    properties().forEach(function(p) {
        p.attachToObject(self);
        p.setRequestManager(self._requestManager);
    });
}

var methods = function () {
    let getBalance = new Method({
        name: 'getBalance',
        call: 'balanceOf',
        params: 2,
        inputFormatter: [formatters.inputBranchIdFormatter, formatters.inputAddressFormatter],
        outputFormatter: formatters.outputBigNumberFormatter
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

    let transfer = new Method({
        name: 'transfer',
        call: 'transfer',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputBigNumberFormatter]
    });

    let sendTransaction = new Method({
        name: 'sendTransaction',
        call: 'ygg_sendTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter]
    });

    let signTransaction = new Method({
        name: 'signTransaction',
        call: 'ygg_signTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter]
    });

    let sign = new Method({
        name: 'sign',
        call: 'ygg_sign',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, null]
    });

    let branch = new Method({
        name: 'branch',
        call: 'create',
        params: 1,
        inputFormatter: [formatters.inputSeedFormatter]
    });

    let register = new Method({
        name: 'register',
        call: 'ygg_register',
        params: 1,
        inputFormatter: [formatters.inputBranchRegisterFormatter]
    });

    let unregister = new Method({
        name: 'unregister',
        call: 'ygg_unregister',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, null]
    });

    return [
        getBalance,
        getBlock,
        getTransaction,
        getTransactionFromBlock,
        getTransactionReceipt,
        signTransaction,
        transfer,
        sendTransaction,
        sign,
        branch,
        register,
        unregister
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
