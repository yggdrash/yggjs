const Jsonrpc = require('./jsonrpc');
const utils = require('../utils/index');

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
    const payload = Jsonrpc.toPayload(data.method, data.params)

    switch (payload.method) {
        default :
            return new Promise((resolve, reject) => {
                Jsonrpc.query(data, this.provider.host)
                .then((data) => {
                    resolve(data)
                })
            })

        /* body */
        case 'approve':
        case 'transfer':
        case 'transferfrom':
            return  utils.jsonToArrayString(data);
        case 'sendTransaction':
            return new Promise((resolve, reject) => {
                Jsonrpc.sendTX(data.method, data.params, this.provider.host)
                .then((data) => {
                    resolve(data)
                })
            })
    } 
}

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

