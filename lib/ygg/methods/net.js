const utils = require('../../utils/index');
const Property = require('../property');

var Net = function (ygg) {
    this._requestManager = ygg._requestManager;

    let self = this;

    properties().forEach(function(p) { 
        p.attachToObject(self);
        p.setRequestManager(ygg._requestManager);
    });
};

var properties = function () {
    return [
        new Property({
            name: 'listening',
            getter: 'net_listening'
        }),
        new Property({
            name: 'peerCount',
            getter: 'net_peerCount',
            outputFormatter: utils.toDecimal
        })
    ];
};

module.exports = Net;
