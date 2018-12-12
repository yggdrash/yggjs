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

    let getBranchId = new Method({
        name: 'getBranchId',
        call: 'getallbranchid'
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

    let txBody = new Method({
        name: 'txBody',
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

    let nodeHello = new Method({
        name: 'nodeHello',
        call: 'nodeHelloBody',
        params: 1,
        inputFormatter: [null]
    });

    let getNonce = new Method({
        name: 'getNonce',
        call: 'getNonce',
        params: 1,
        inputFormatter: [formatters.inputNodeHelloFormatter],
    });

    let nodeRestart = new Method({
        name: 'nodeRestart',
        call: 'restart',
        params: 1,
        inputFormatter: [formatters.inputNodeHelloFormatter],
    });

    let nodeSetConfig = new Method({
        name: 'nodeSetConfig',
        call: 'setConfig',
        params: 2,
        inputFormatter: [formatters.inputNodeSetConfigPortFormatter, formatters.inputNodeSetConfigLogFormatter],
    });

    let requestCommand = new Method({
        name: 'requestCommand',
        call: 'requestCommand',
        params: 1,
        inputFormatter: [formatters.inputNodeHelloFormatter],
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
        getBranchId,
        getBlock,
        getTransaction,
        getTransactionFromBlock,
        getTransactionReceipt,
        signTransaction,
        txBody,
        sendTransaction,
        sign,
        branch,
        plant,
        unregister,
        nodeHello,
        getNonce,
        nodeRestart,
        nodeSetConfig,
        requestCommand,
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
