/**
 * @file ygg.js
 * @authors:
 *   Tedy Woo <tedy@r2v.io>
 * @date 2018
 */

const RequestManager = require('./ygg/requestmanager')
const Client = require('./ygg/methods/client')
const Net = require('./ygg/methods/net')
const version = require('../package.json')
const utils = require('./utils/index')
const sha3 = require('./utils/sha3')
const extend = require('./ygg/extend')
const Property = require('./ygg/property')
const HttpProvider = require('./ygg/httpprovider')
const Tx = require('./local/transaction')
const Genesis = require('./local/genesis')
const Wallet = require('./local/wallet/generation')
const HDkey = require('./local/wallet/hdkey')
const BigNumber = require('bignumber.js')

function Ygg (provider) {
    this._requestManager = new RequestManager(provider)
    this.currentProvider = provider
    this.client = new Client(this)
    this.net = new Net(this)
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
Ygg.prototype.utils = utils;
Ygg.prototype.tx = Tx;
Ygg.prototype.genesis = Genesis;
Ygg.prototype.wallet = Wallet;
Ygg.prototype.hdwallet = HDkey;

Ygg.prototype.sha3 = function(string, options) {
    return '0x' + sha3(string, options);
};

const properties = function () {
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

