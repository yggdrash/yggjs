const fetch = require('node-fetch');

var Jsonrpc = {
  messageId: 0
};

function getClient(host, option) {
  var jsEnv = require('browser-or-node');

  if (jsEnv.isBrowser) {
    const callServer = function(request, callback) {
      const options = {
        method: 'POST',
        body: request,
        headers: {
          'Content-Type': 'application/json',
        }
      };

      fetch(host, options)
          .then(function(res) { return res.text(); })
          .then(function(text) { callback(null, text); })
          .catch(function(err) { callback(err); });
    };
    var jaysonBrowserClient = require('jayson/lib/client/browser');
    const client = jaysonBrowserClient(callServer, {
      // other options go here
    });
    return client;
  } else if (jsEnv.isNode) {
    var jayson = require('jayson');
    return jayson.client.http(host);
  }
}

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
    let client = getClient(`${host}/api/transaction`)
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
 * @param {Function} method of jsonrpc call, required
 * @param {Array} params, an array of method params, optional
 * @param {Array} host, ip address, optional
 * @returns {Object} valid jsonrpc payload object
 */
Jsonrpc.sendRawTX = function (method, params, host) {
  return new Promise((resolve, reject) => {
    let client = getClient(`${host}/api/transaction`)
    client.request(method, {rawTx: params[0]}, (err, res) => {
      if(!err) resolve(res.result)
      resolve(null)
    })
  })
};

Jsonrpc.sendTXAPI = function (method, params, host) {
  return new Promise((resolve, reject) => {
    let client = getClient(`${host}/api/transaction`)
    client.request(method, params, (err, res) => {
      if(!err) resolve(res.result)
      resolve(null)
    })
  })
}

Jsonrpc.getLogs = function (method, params, host) {
  return new Promise((resolve, reject) => {
    let client = getClient(`${host}/api/log`)
    client.request(method, params, (err, res) => {
      if(!err) resolve(res.result)
      resolve(null)
    })
  })
}

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
    let client = getClient(`${host}/api/contract`)
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
    let client = getClient(`${host}/api/branch`)
    client.request(method, {}, (err, res) => {
      if(!err) resolve(res.result)
      resolve(null)
    })
  })
};

Jsonrpc.block = function (method, params, host) {
  return new Promise((resolve, reject) => {
    let client = getClient(`${host}/api/block`)
    client.request(method, params, (err, res) => {
      if(!err) resolve(res.result)
      resolve(null)
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

