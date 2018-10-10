/**
 * @file ygg.js
 * @authors:
 *   Tedy Woo <tedy@r2v.io>
 * @date 2018
 */

var RequestManager = require('./ygg/requestmanager');
var Client = require('./ygg/methods/client');
var Net = require('./ygg/methods/net');
var Wallet = require('./ygg/methods/wallet');
var version = require('./version.json');
var utils = require('./utils/utils');
var sha3 = require('./utils/sha3');
var extend = require('./ygg/extend');
var Property = require('./ygg/property');
var HttpProvider = require('./ygg/httpprovider');
var Tx = require('./internal/tx');
var txUtils = require('./internal/utils');
var BigNumber = require('bignumber.js');

function Ygg (provider) {
    this._requestManager = new RequestManager(provider);
    this.currentProvider = provider;
    this.client = new Client(this);
    this.net = new Net(this);
    this.wallet = new Wallet(this);
    this.version = {
        api: version.version
    };
    this.providers = {
        HttpProvider: HttpProvider
    };
    this._extend = extend(this);
    this._extend({
        properties: properties()
    });
}

Ygg.providers = {
    HttpProvider: HttpProvider
};

Ygg.prototype.setProvider = function (provider) {
    this._requestManager.setProvider(provider);
    this.currentProvider = provider;
};

Ygg.prototype.BigNumber = BigNumber;
Ygg.prototype.txUtils = txUtils;
Ygg.prototype.utils = utils;
Ygg.prototype.tx = Tx;

Ygg.prototype.sha3 = function(string, options) {
    return '0x' + sha3(string, options);
};

var properties = function () {
    return [
        new Property({
            name: 'version.node',
            getter: 'ygg_clientVersion'
        }),
        new Property({
            name: 'version.network',
            getter: 'net_version',
            inputFormatter: utils.toDecimal
        })
    ];
};

Ygg.prototype.isConnected = function(){
    return (this.currentProvider && this.currentProvider.isConnected());
};

module.exports = Ygg;

