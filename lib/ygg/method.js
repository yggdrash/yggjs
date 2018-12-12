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
        case 'transfer':  
            return {
                method: call,
                param: [{ 
                    to : params[0].toLocaleLowerCase(),
                    amount : params[1].toString()
                }]
            };
        case 'totalSupply':
        case 'specification':
            return {
                address: params,
                method: call,
                param: {}
            };
        case 'balanceOf':
            return {
                address: params[0],
                method: call,
                param: { 
                    address : params[1]
                }
            };
        case 'getallbranchid':  
            return {
                address: "91b29a1453258d72ca6fbbcabb8dca10cca944fb",
                method: call,
                param: {}
            };
        case 'allowance':
            return {
                address: params[0],
                method: call,
                param: {
                    owner: params[1],
                    spender: params[2]
                }
            };
        case 'nodeHelloBody': 
            return {
                method: "nodeHello",
            };
        case 'restart': 
            return {
                method: call,
            };
        case 'setConfig': 
            return {
                method: call,
                param: `{network{port:${params[0]}},log{level:${params[1]}}}`
            };

        default :
            return {
                method: call,
                param: params
            };
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
