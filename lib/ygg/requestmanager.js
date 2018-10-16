const Jsonrpc = require('./jsonrpc');
const utils = require('../utils/utils');

const RequestManager = function (provider) {
    this.provider = provider;
    this.polls = {};
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
    const payload = Jsonrpc.toPayload(data.method, data.params, this.provider.host);
    
    switch(payload.method) {
        case 'balanceOf':
            let balance = Jsonrpc.get(data.method, utils.dataToJson2(data), this.provider.host);
            return balance;
        
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
            return  data;

        case 'ygg_plant':
            return new Promise((resolve, reject) => {
                Jsonrpc.sendTX(data.method, data.params, this.provider.host)
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

/**
 * Should be called to asynchronously send batch request
 *
 * @method sendBatch
 * @param {Array} batch data
 * @param {Function} callback
 */
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

/**
 * Should be used to start polling
 *
 * @method startPolling
 * @param {Object} data
 * @param {Number} pollId
 * @param {Function} callback
 * @param {Function} uninstall
 *
 * @todo cleanup number of params
 */
RequestManager.prototype.startPolling = function (data, pollId, callback, uninstall) {
    this.polls[pollId] = {data: data, id: pollId, callback: callback, uninstall: uninstall};


    // start polling
    if (!this.timeout) {
        this.poll();
    }
};

/**
 * Should be used to stop polling for filter with given id
 *
 * @method stopPolling
 * @param {Number} pollId
 */
RequestManager.prototype.stopPolling = function (pollId) {
    delete this.polls[pollId];

    // stop polling
    if(Object.keys(this.polls).length === 0 && this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
    }
};

/**
 * Should be called to reset the polling mechanism of the request manager
 *
 * @method reset
 */
RequestManager.prototype.reset = function (keepIsSyncing) {

    for (var key in this.polls) {
        if(!keepIsSyncing || key.indexOf('syncPoll_') === -1) {
            this.polls[key].uninstall();
            delete this.polls[key];
        }
    }

    // stop polling
    if(Object.keys(this.polls).length === 0 && this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
    }
};

/**
 * Should be called to poll for changes on filter with given id
 *
 * @method poll
 */
RequestManager.prototype.poll = function () {
    this.timeout = setTimeout(this.poll.bind(this), c.ETH_POLLING_TIMEOUT);

    if (Object.keys(this.polls).length === 0) {
        return;
    }

    const pollsData = [];
    const pollsIds = [];
    for (var key in this.polls) {
        pollsData.push(this.polls[key].data);
        pollsIds.push(key);
    }

    if (pollsData.length === 0) {
        return;
    }

    const payload = Jsonrpc.toBatchPayload(pollsData);
    
    const pollsIdMap = {};
    payload.forEach(function(load, index){
        pollsIdMap[load.id] = pollsIds[index];
    });


    let self = this;
    this.provider.sendAsync(payload, function (error, results) {

        if (error) {
            return;
        }

        results.map(function (result) {
            var id = pollsIdMap[result.id];

            if (self.polls[id]) {
                result.callback = self.polls[id].callback;
                return result;
            } else
                return false;
        }).filter(function (result) {
            return !!result; 
        }).filter(function (result) {
            var valid = Jsonrpc.isValidResponse(result);
            
            return valid;
        }).forEach(function (result) {
            result.callback(null, result.result);
        });
    });
};

module.exports = RequestManager;

