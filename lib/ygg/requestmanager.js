const Jsonrpc = require('./jsonrpc');
const utils = require('../utils/utils');

const RequestManager = function (provider) {
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
    // console.log("data", data)
    // console.log("params", data.params[0])
    const payload = Jsonrpc.toPayload(data.method, data.params);

    switch(payload.method) {
        case 'balanceOf':
            return new Promise((resolve, reject) => {
                Jsonrpc.get(data.method, utils.dataToJsonNonArray(data), this.provider.host)
                .then((data) => {
                    resolve(data)
                })
            });

        case 'search':
            return new Promise((resolve, reject) => {
                Jsonrpc.get(data.method, utils.dataToJson(data), this.provider.host)
                .then((data) => {
                    resolve(data)
                })
            });
        
        case 'transfer':
            return  data;
        case 'ygg_sendTransaction':
            return new Promise((resolve, reject) => {
                Jsonrpc.sendTX(data.method, data.params, this.provider.host)
                .then((data) => {
                    resolve(data)
                })
            });

        case 'create':
            return  data.params[0];
        case 'branchId':
            return  data.params[0];
        case 'ygg_plant':
            return new Promise((resolve, reject) => {
                Jsonrpc.sendTX(data.method, data.params, this.provider.host)
                .then((data) => {
                    resolve(data)
                })
            });

        case 'nodeHello':
            return  data;
        case 'getNonce':
            return new Promise((resolve, reject) => {
                Jsonrpc.sendAdminTX(data.method, data, this.provider.host)
                .then((data) => {
                    resolve(data)
                })
            });
        case 'restart':
            return  data;
        case 'setConfig':
            return  data;
        case 'requestCommand':
            return new Promise((resolve, reject) => {
                Jsonrpc.sendAdminTX(data.method, data, this.provider.host)
                .then((data) => {
                    resolve(data)
                })
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
    const payload = Jsonrpc.toBatchPayload(data);

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

