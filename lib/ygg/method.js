const utils = require('../utils/index');

const Method = function (options) {
    this.name = options.name;
    this.call = options.call;
    this.params = options.params || 0;
    this.inputFormatter = options.inputFormatter;
    this.outputFormatter = options.outputFormatter;
    this.requestManager = null;
};

/**
 * Should be used to determine name of the jsonrpc method based on arguments
 *
 * @method getCall
 * @param {Array} arguments
 * @return {String} name of jsonrpc method
 */
Method.prototype.getCall = function (args) {
    return utils.isFunction(this.call) ? this.call(args) : this.call;
};

/**
 * Should be used to extract callback from array of arguments. Modifies input param
 *
 * @method extractCallback
 * @param {Array} arguments
 * @return {Function|Null} callback, if exists
 */
Method.prototype.extractCallback = function (args) {
    if (utils.isFunction(args[args.length - 1])) {
        return args.pop(); // modify the args array!
    }
};

/**
 * Should be called to format input args of method
 * 
 * @method formatInput
 * @param {Array}
 * @return {Array}
 */
Method.prototype.formatInput = function (args) {
    if (!this.inputFormatter) {
        return args;
    }

    return this.inputFormatter.map(function (formatter, index) {
        return formatter ? formatter(args[index]) : args[index];
    });
};


/**
 * Should be called to check if the number of arguments is correct
 * 
 * @method validateArgs
 * @param {Array} arguments
 * @throws {Error} if it is not
 */
Method.prototype.validateArgs = function (args) {
    if (args.length !== this.params) {
        throw errors.InvalidNumberOfRPCParams();
    }
};


/**
 * Should be called to format output(result) of method
 *
 * @method formatOutput
 * @param {Object}
 * @return {Object}
 */
Method.prototype.formatOutput = function (result) {
    return this.outputFormatter && result ? this.outputFormatter(result) : result;
};

Method.prototype.attachToObject = function (obj) {
    const func = this.buildCall()
    func.call = this.call

    obj[this.name] = func
}

Method.prototype.buildCall = function() {
    let method = this;
    const send = function () {
        let payload = method.toPayload(Array.prototype.slice.call(arguments));
        return method.formatOutput(method.requestManager.send(payload));
    };
    send.request = this.request.bind(this);

    return send;
};

Method.prototype.setRequestManager = function (rm) {
    this.requestManager = rm;
};

/**
 * Should create payload from given input args
 *
 * @method toPayload
 * @param {Array} args
 * @return {Object}
 */
Method.prototype.toPayload = function (args) {
    let call = this.getCall(args);
    let params = this.formatInput(args);
    this.validateArgs(params);

    switch(call) {
        /** tx **/
        case 'approve':  
            return {
                method: call,
                contractVersion: params[0],
                params: { 
                    spender : params[1].toLocaleLowerCase(),
                    amount : params[2]
                }
            }
        case 'transactionConfirm':  
            return {
                method: call,
                contractVersion: params[0],
                params: { 
                    txConfirmId : params[1].toLocaleLowerCase(),
                    status : params[2],
                    blockHeight : params[3],
                    index : params[4],
                    lastBlockHeight : params[5]
                }
            }
        case 'transfer':  
            return {
                method: call,
                contractVersion: params[0],
                params: { 
                    to : params[1].toLocaleLowerCase(),
                    amount : params[2]
                }
            }
        case 'transferFrom':  
            return {
                method: call,
                contractVersion: params[0],
                params: { 
                    from : params[1].toLocaleLowerCase(),
                    to : params[2].toLocaleLowerCase(),
                    amount : params[3]
                }
            }
        case 'faucet':  
            return {
                method: call,
                contractVersion: params[0],
                params: {}
            }
        case 'sendTransaction':
            return {
                method: call,
                params: params
            };
        case 'query':
            return {
                method: call,
                params: params[0]
            };
        /** contract **/
        case 'getContracts':
            return {
                contractId : params[0],
                method: call
            }
        case 'getMethod':
            return {
                contractId : params[0],
                method: call
            }

        /** contract query **/
        case 'queryPropose':
            return {
                branchId: params[0],
                contractVersion: params[1],
                method: call,
                params: {
                    proposeId : params[2]
                }
            }
        case 'queryTransactionConfirm':
            return {
                branchId: params[0],
                contractVersion: params[1],
                method: call,
                params: {
                    txConfirmId : params[2]
                }
            }
        case 'balanceOf':
            return {
                branchId: params[0],
                contractVersion: params[1],
                method: call,
                params: {
                    address : params[2]
                }
            }
        case 'allowance':
            return {
                branchId: params[0],
                contractVersion: params[1],
                method: call,
                params: {
                    owner: params[2],
                    spender: params[3]
                }
            }

        case 'getTransactionByHash':
        case 'getTransactionReceipt':
            return {
                method: call,
                params: {
                    branchId: params[0],
                    txId: params[1]
                }
            }
        case 'getLogs':
            return {
                method: call,
                params: {
                    branchId: params[0],
                    start: params[1],
                    offset: params[2],
                }
            }
            
        case 'newPendingTransactionFilter':    
        case 'getPendingTransactionList':    
        case 'blockNumber':    
        case 'curIndex':
            return {
                method: call,
                params: {
                    branchId: params[0]
                }
            }
        case 'fliterLogs':
            return {
                method: call,
                params: {
                    branchId: params[0],
                    regex: params[1],
                    start: params[2],
                    offset: params[3]
                }
            }
            
        default :
            return {
                method: call
            }
    }
};

/**
 * Should be called to create pure JSONRPC request which can be used in batch request
 *
 * @method request
 * @param {...} params
 * @return {Object} jsonrpc request
 */
Method.prototype.request = function () {
    var payload = this.toPayload(Array.prototype.slice.call(arguments));
    payload.format = this.formatOutput.bind(this);
    return payload;
};

module.exports = Method;
