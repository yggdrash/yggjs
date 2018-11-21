'use strict'

const utils = require('../utils/utils');
const Iban = require('./iban');
const tx = require('../local/transaction');
const { Buffer } = require('safe-buffer')

const inputBigNumberFormatter =  (number) => {
    return number;
};

/**
 * Should the format output to a big number
 *
 * @method outputBigNumberFormatter
 * @param {String|Number|BigNumber}
 * @returns {BigNumber} object
 */
const outputBigNumberFormatter = (number) => {
    return number
    // return utils.toBigNumber(number);
};

const inputNodeHelloFormatter = serialize => {
    return serialize;
}

const inputNodeSetConfigPortFormatter = (port) => {
    return port;
};

const inputNodeSetConfigLogFormatter = (log) => {
    if(typeof log === 'string') return log;
};

const inputStringFormatter =  (str) => {
    if(typeof str === 'string') return str;
};

const inputBlockNumberFormatter =  (blockNumber) => {
    if (blockNumber === undefined) {
        return undefined;
    } else if (isPredefinedBlockNumber(blockNumber)) {
        return blockNumber;
    }
    return utils.toHex(blockNumber);
};


/**
 * Formats the input of a transaction and converts all values to HEX
 *
 * @method inputTransactionFormatter
 * @param {Object} transaction options
 * @returns object
*/
const inputTransactionFormatter =  (options) => {

    return options;
};

/**
 * Formats the output of a transaction to its proper values
 *
 * @method outputTransactionFormatter
 * @param {Object} tx
 * @returns {Object}
*/
const outputTransactionFormatter =  (tx) => {
    if(tx.blockNumber !== null)
        tx.blockNumber = utils.toDecimal(tx.blockNumber);
    if(tx.transactionIndex !== null)
        tx.transactionIndex = utils.toDecimal(tx.transactionIndex);
    tx.nonce = utils.toDecimal(tx.nonce);
    tx.gas = utils.toDecimal(tx.gas);
    tx.gasPrice = utils.toBigNumber(tx.gasPrice);
    tx.value = utils.toBigNumber(tx.value);
    return tx;
};

/**
 * Formats the output of a transaction receipt to its proper values
 *
 * @method outputTransactionReceiptFormatter
 * @param {Object} receipt
 * @returns {Object}
*/
const outputTransactionReceiptFormatter = (receipt) => {
    if(receipt.blockNumber !== null)
        receipt.blockNumber = utils.toDecimal(receipt.blockNumber);
    if(receipt.transactionIndex !== null)
        receipt.transactionIndex = utils.toDecimal(receipt.transactionIndex);
    receipt.cumulativeGasUsed = utils.toDecimal(receipt.cumulativeGasUsed);
    receipt.gasUsed = utils.toDecimal(receipt.gasUsed);

    if(utils.isArray(receipt.logs)) {
        receipt.logs = receipt.logs.map((log) =>{
          return outputLogFormatter(log);
        });
    }

    return receipt;
};

/**
 * Formats the output of a block to its proper values
 *
 * @method outputBlockFormatter
 * @param {Object} block
 * @returns {Object}
*/
const outputBlockFormatter = (block) => {
    // transform to number
    block.gasLimit = utils.toDecimal(block.gasLimit);
    block.gasUsed = utils.toDecimal(block.gasUsed);
    block.size = utils.toDecimal(block.size);
    block.timestamp = utils.toDecimal(block.timestamp);
    if(block.number !== null)
        block.number = utils.toDecimal(block.number);

    block.difficulty = utils.toBigNumber(block.difficulty);
    block.totalDifficulty = utils.toBigNumber(block.totalDifficulty);

    if (utils.isArray(block.transactions)) {
        block.transactions.forEach((item) => {
           if(!utils.isString(item))
                return outputTransactionFormatter(item);
        });
    }

    return block;
};

/**
 * Formats the output of a log
 *
 * @method outputLogFormatter
 * @param {Object} log object
 * @returns {Object} log
*/
const outputLogFormatter = (log) => {
    if(log.blockNumber)
        log.blockNumber = utils.toDecimal(log.blockNumber);
    if(log.transactionIndex)
        log.transactionIndex = utils.toDecimal(log.transactionIndex);
    if(log.logIndex)
        log.logIndex = utils.toDecimal(log.logIndex);

    return log;
};

/**
 * Formats the input of a whisper post and converts all values to HEX
 *
 * @method inputPostFormatter
 * @param {Object} transaction object
 * @returns {Object}
*/
const inputPostFormatter = (post) => {

    // post.payload = utils.toHex(post.payload);
    post.ttl = utils.fromDecimal(post.ttl);
    post.workToProve = utils.fromDecimal(post.workToProve);
    post.priority = utils.fromDecimal(post.priority);

    // fallback
    if (!utils.isArray(post.topics)) {
        post.topics = post.topics ? [post.topics] : [];
    }

    // format the following options
    post.topics = post.topics.map((topic) => {
        // convert only if not hex
        return (topic.indexOf('0x') === 0) ? topic : utils.fromUtf8(topic);
    });

    return post;
};

/**
 * Formats the output of a received post message
 *
 * @method outputPostFormatter
 * @param {Object}
 * @returns {Object}
 */
const outputPostFormatter = (post) => {
    post.expiry = utils.toDecimal(post.expiry);
    post.sent = utils.toDecimal(post.sent);
    post.ttl = utils.toDecimal(post.ttl);
    post.workProved = utils.toDecimal(post.workProved);
    // post.payloadRaw = post.payload;
    // post.payload = utils.toAscii(post.payload);

    // if (utils.isJson(post.payload)) {
    //     post.payload = JSON.parse(post.payload);
    // }

    // format the following options
    if (!post.topics) {
        post.topics = [];
    }
    post.topics = post.topics.map((topic) => {
        return utils.toAscii(topic);
    });

    return post;
};

const inputAddressFormatter = address => {
    let iban = new Iban(address);
    if (iban.isValid() && iban.isDirect()) {
        return iban.address()
    } else if (utils.isStrictAddress(address)) {
        return address
    } else if (utils.isAddress(address)) {
        return address
    }
    throw new Error('invalid address');
};

/**
 * Formats the output of a received post message
 *
 * @method inputSeedFormatter
 * @param {Object}
 * @returns {Object}
 */

const inputSeedFormatter = seed => {
    // TODO: data exception handling   
    const timestamp = new Date().getTime()
    const body = {
        "branchId": utils.branchId(
                                    seed.name, 
                                    seed.property, 
                                    seed.type, 
                                    timestamp, 
                                    seed.version, 
                                    seed.reference_address, 
                                    seed.reserve_address.toLocaleLowerCase()), 
        "branch": {
                "name": seed.name,
                "symbol": seed.symbol,
                "property": seed.property,
                "type": seed.type,
                "description": seed. description,
                "tag": seed.tag,
                "version": seed.version,
                "reference_address": seed.reference_address,
                "reserve_address": seed.reserve_address.toLocaleLowerCase(),
                "owner": seed.owner.toLocaleLowerCase(),
                "timestamp": timestamp,
                "version_history":[seed.version]
            }
    }
    return body;
}

const inputBranchIdFormatter = branchId => {
    let iban = new Iban(branchId);
    if (iban.isValid() && iban.isDirect()) {
        return iban.address()
    } else if (utils.isStrictAddress(branchId)) {
        return branchId
    } else if (utils.isAddress(branchId)) {
        return branchId
    }
    throw new Error('invalid branchId');
}

const inputBranchRegisterFormatter = (params) => {
    // TODO: data exception handling
   
    return params;
};

module.exports = {
    inputBlockNumberFormatter: inputBlockNumberFormatter,
    inputTransactionFormatter: inputTransactionFormatter,
    inputAddressFormatter: inputAddressFormatter,
    inputPostFormatter: inputPostFormatter,
    inputBigNumberFormatter: inputBigNumberFormatter,
    outputBigNumberFormatter: outputBigNumberFormatter,
    outputTransactionFormatter: outputTransactionFormatter,
    outputTransactionReceiptFormatter: outputTransactionReceiptFormatter,
    outputBlockFormatter: outputBlockFormatter,
    outputLogFormatter: outputLogFormatter,
    outputPostFormatter: outputPostFormatter,
    inputSeedFormatter: inputSeedFormatter,
    inputBranchRegisterFormatter: inputBranchRegisterFormatter,
    inputBranchIdFormatter: inputBranchIdFormatter,
    inputStringFormatter: inputStringFormatter,
    inputNodeHelloFormatter: inputNodeHelloFormatter,
    inputNodeSetConfigPortFormatter: inputNodeSetConfigPortFormatter,
    inputNodeSetConfigLogFormatter: inputNodeSetConfigLogFormatter
};

