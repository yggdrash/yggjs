'use strict';

var Jsonrpc = require('./jsonrpc');
var utils = require('../utils/utils');

var RequestManager = function RequestManager(provider) {
    this.provider = provider;
    this.timeout = null;
};

/**
 * Should be used to synchronously send request
 *
 * @method send
 * @param {Object} data
 * @return {Object}
 */
RequestManager.prototype.send = function (data) {
    var _this = this;

    // console.log("data", data)
    // console.log("params", data.params[0])
    var payload = Jsonrpc.toPayload(data.method, data.params, this.provider.host);

    switch (payload.method) {
        case 'balanceOf':
            return new Promise(function (resolve, reject) {
                Jsonrpc.get(data.method, utils.dataToJsonNonArray(data), _this.provider.host).then(function (data) {
                    resolve(data);
                });
            });

        case 'search':
            return new Promise(function (resolve, reject) {
                Jsonrpc.get(data.method, utils.dataToJson(data), _this.provider.host).then(function (data) {
                    resolve(data);
                });
            });

        case 'transfer':
            return data;

        case 'ygg_sendTransaction':
            return new Promise(function (resolve, reject) {
                Jsonrpc.sendTX(data.method, data.params, _this.provider.host).then(function (data) {
                    resolve(data);
                });
            });

        case 'create':
            return data;

        case 'ygg_plant':
            return new Promise(function (resolve, reject) {
                Jsonrpc.sendTX(data.method, data.params, _this.provider.host).then(function (data) {
                    resolve(data);
                });
            });
    }
};

/**
 * Should be used to asynchronously send request
 *
 * @method sendAsync
 * @param {Object} data
 * @param {Function} callback
 */
RequestManager.prototype.sendAsync = function (data, callback) {

    var payload = Jsonrpc.toPayload(data.method, data.params);
    this.provider.sendAsync(payload, function (err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, result.result);
    });
};

RequestManager.prototype.sendBatch = function (data, callback) {

    var payload = Jsonrpc.toBatchPayload(data);

    this.provider.sendAsync(payload, function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(err, results);
    });
};

/**
 * Should be used to set provider of request manager
 *
 * @method setProvider
 * @param {Object}
 */
RequestManager.prototype.setProvider = function (p) {
    this.provider = p;
};

module.exports = RequestManager;