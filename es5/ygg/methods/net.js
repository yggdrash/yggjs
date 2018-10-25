'use strict';

var utils = require('../../utils/utils');
var Property = require('../property');

var Net = function Net(ygg) {
    this._requestManager = ygg._requestManager;

    var self = this;

    properties().forEach(function (p) {
        p.attachToObject(self);
        p.setRequestManager(ygg._requestManager);
    });
};

var properties = function properties() {
    return [new Property({
        name: 'listening',
        getter: 'net_listening'
    }), new Property({
        name: 'peerCount',
        getter: 'net_peerCount',
        outputFormatter: utils.toDecimal
    })];
};

module.exports = Net;