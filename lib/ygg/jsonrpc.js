const jayson = require('jayson')

var Jsonrpc = {
    messageId: 0
};

/**
 * Should be called to valid json create payload object
 *
 * @method toPayload
 * @param {Function} method of jsonrpc call, required
 * @param {Array} params, an array of method params, optional
 * @returns {Object} valid jsonrpc payload object
 */
Jsonrpc.toPayload = function (method, params) {
    if (!method)
        console.error('jsonrpc method should be specified!')

    Jsonrpc.messageId++

    return {
        jsonrpc: '2.0',
        id: Jsonrpc.messageId,
        method: method,
        params: params || []
    };
};

/**
 * Should be called to valid json create payload object
 *
 * @method toPayload
 * @param {Function} method of jsonrpc call, required
 * @param {Array} params, an array of method params, optional
 * @param {Array} host, ip address, optional
 * @returns {Object} valid jsonrpc payload object
 */
Jsonrpc.sendTX = function (method, params, host) {
    return new Promise((resolve, reject) => {
        let client = jayson.client.http(`${host}/api/transaction`)
        client.request(method, {tx: params[0]}, (err, res) => {
            if(!err) resolve(res.result)
            resolve(null)
        })
    })
};

/**
 * Should be called to valid json create payload object
 *
 * @method toPayload
 * @param {Array} params, an array of method params, optional
 * @param {Array} host, ip address, optional
 * @returns {Object} valid jsonrpc payload object
 */
Jsonrpc.query = function (params, host) {
    return new Promise((resolve, reject) => {
        let client = jayson.client.http(`${host}/api/contract`)
        client.request('query', {
                branchId: params.branchId,
                contractVersion: params.contractVersion,
                method: params.method,
                params: params.params
            }, (err, res) => {
                if(!err) resolve(res.result)
                resolve(null)
            })
    })
};


/**
 * Should be called to valid json create payload object
 *
 * @method toPayload
 * @param {Function} method of jsonrpc call, required
 * @param {Array} host, ip address, optional
 * @returns {Object} valid jsonrpc payload object
 */
Jsonrpc.branch = function (method, host) {
    return new Promise((resolve, reject) => {
        let client = jayson.client.http(`${host}/api/branch`)
        client.request(method, {}, (err, res) => {
                    if(err) throw err
                    resolve(res.result)
            })
    })
};

/**
 * Should be called to check if jsonrpc response is valid
 *
 * @method isValidResponse
 * @param {Object}
 * @returns {Boolean} true if response is valid, otherwise false
 */
Jsonrpc.isValidResponse = function (response) {
    return Array.isArray(response) ? response.every(validateSingleMessage) : validateSingleMessage(response);

    function validateSingleMessage(message){
      return !!message &&
        !message.error &&
        message.jsonrpc === '2.0' &&
        typeof message.id === 'number' &&
        message.result !== undefined; // only undefined is not valid json object
    }
};

module.exports = Jsonrpc;

