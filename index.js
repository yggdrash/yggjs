var Ygg = require('./lib/ygg');
var { toBuffer, dataToJson } = require('./lib/internal/utils');

if (typeof window !== 'undefined' && typeof window.Ygg === 'undefined') {
    window.Ygg = Ygg;
}

// module.exports = Ygg;

if (typeof ygg !== 'undefined') {
    ygg = new Ygg(ygg.currentProvider);
} else {
    // Set the provider you want from Web3.providers
    ygg = new Ygg(new Ygg.providers.HttpProvider("http://localhost:8080"));
    // let val = ygg.client.getBalance('0xa771a6b5a6cabe2ca35fd55631717d95049d6338', '0xa771a6b5a6cabe2ca35fd55631717d95049d6338');
    // console.log(val);
}


var owner = 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6';
var seed = {            
         "name": 'YEED',
         "symbol": 'YEED',
         "property": 'currency',
         "type": 'immunity',
         "description": 'YEED is the currency used inside YGGDRASH. The vitality of the new branch chain is decided by the amount of YEED, which will be consumed gradually.',
         "tag": 0.1,
         "version": '0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0',
         "reference_address": '0xcee3d4755e47055b530deeba062c5bd0c17eb00f',
         "reserve_address": '0xcee3d4755e47055b530deeba062c5bd0c17eb00f',
         "owner": owner,
         "version_history":['0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0']
}

const branch = ygg.client.branch(seed);

const txHeaderData = {
    "chain":`0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7`,
    "version":`0x0000000000000000`,
    "type":`0x0000000000000000`,
    "timeStamp":`0x000000005bbd6570`,
    "bodyHash": `0x${ygg.utils.bodyHashHex(dataToJson(branch))}`,
    "bodyLength":`0x000000000000029f`
  };

let tx = new ygg.tx(txHeaderData);

const signature = tx.sign(ygg.txUtils.toBuffer(`0x5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520`));

let registerData = tx.branchRegister(branch, signature);

let register = ygg.client.register(registerData);

console.log(register)