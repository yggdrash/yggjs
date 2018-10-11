"use strict";

var formatters = require('../formatters');
var utils = require('../../utils/utils');
var Method = require('../method');
var Property = require('../property');

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
    var getBalance = new Method({
        name: 'getBalance',
        call: 'balanceOf',
        params: 2,
        inputFormatter: [formatters.inputBranchIdFormatter, formatters.inputAddressFormatter],
        outputFormatter: formatters.outputBigNumberFormatter
    });

    var getBlock = new Method({
        name: 'getBlock',
        call: blockCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, function (val) { return !!val; }],
        outputFormatter: formatters.outputBlockFormatter
    });

    var getTransaction = new Method({
        name: 'getTransaction',
        call: 'ygg_getTransactionByHash',
        params: 1,
        outputFormatter: formatters.outputTransactionFormatter
    });

    var getTransactionFromBlock = new Method({
        name: 'getTransactionFromBlock',
        call: transactionFromBlockCall,
        params: 2,
        inputFormatter: [formatters.inputBlockNumberFormatter, utils.toHex],
        outputFormatter: formatters.outputTransactionFormatter
    });

    var getTransactionReceipt = new Method({
        name: 'getTransactionReceipt',
        call: 'ygg_getTransactionReceipt',
        params: 1,
        outputFormatter: formatters.outputTransactionReceiptFormatter
    });

    var transfer = new Method({
        name: 'transfer',
        call: 'transfer',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, formatters.inputBigNumberFormatter]
    });

    var sendTransaction = new Method({
        name: 'sendTransaction',
        call: 'ygg_sendTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter]
    });

    var signTransaction = new Method({
        name: 'signTransaction',
        call: 'ygg_signTransaction',
        params: 1,
        inputFormatter: [formatters.inputTransactionFormatter]
    });

    var sign = new Method({
        name: 'sign',
        call: 'ygg_sign',
        params: 2,
        inputFormatter: [formatters.inputAddressFormatter, null]
    });

    var branch = new Method({
        name: 'branch',
        call: 'ygg_branch',
        params: 1,
        inputFormatter: [formatters.inputSeedFormatter]
    });

    var register = new Method({
        name: 'register',
        call: 'ygg_register',
        params: 1,
        inputFormatter: [formatters.inputBranchRegisterFormatter]
    });

    var unregister = new Method({
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
