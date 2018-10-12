var jayson = require('jayson')

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
        console.error('jsonrpc method should be specified!');

    // advance message ID
    Jsonrpc.messageId++;

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
    var result = "";
    let client = jayson.client.http(`${host}/api/transaction`)
    // console.log("params", params)
    console.log("hash", params[0].hash)
    client.request('sendTransaction', {tx: params[0]}, (err, res) => {
        if(err) throw err
        console.log(res.result)
        return res.result
    })
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
Jsonrpc.get = function (method, params, host) {
    var result = "";
    let client = jayson.client.http(`${host}/api/account`)
    console.log("params", params)
    client.request('balanceOf', {data: params}, (err, res) => {
        if(err) throw err
        console.log(res.result)
        return res.result
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

