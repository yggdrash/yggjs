var Ygg = require('./lib/ygg');

if (typeof window !== 'undefined' && typeof window.Ygg === 'undefined') {
    window.Ygg = Ygg;
}

// module.exports = Ygg;



if (typeof ygg !== 'undefined') {
    ygg = new Ygg(ygg.currentProvider);
} else {
    ygg = new Ygg(new Ygg.providers.HttpProvider("http://localhost:8080"));
}
/* balance */

// let val = ygg.client.getBalance('0xa771a6b5a6cabe2ca35fd55631717d95049d6338', '0xa771a6b5a6cabe2ca35fd55631717d95049d6338');
// console.log(val);


/* transfer */

// var to = 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6';
// var amount = 1000000;

// const transfer = ygg.client.transfer(to, amount);

// let jsonBody = ygg.utils.dataToJson(transfer)

// const bodyHash = ygg.utils.bodyHashHex(jsonBody)

// const bodyLength = ygg.utils.decimalToHex(bodyHash.length)

// let branchId = '0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7'

// const txHeaderData = {
//     "chain":`0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7`,
//     "version":`0x0000000000000000`,
//     "type":`0x0000000000000000`,
//     "timeStamp":`0x${ygg.utils.decimalToHex(Math.round(new Date().getTime() / 1000))}`,
//     "bodyHash": `0x${bodyHash}`,
//     "bodyLength":`0x${bodyLength}`
//   };

// let tx = new ygg.tx(txHeaderData);

// const signature = tx.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));

// let registerData = tx.transferSerialize(branchId, 'A771A6b5A6cAbE2ca35Fd55631717d95049D6338', transfer, signature);

// console.log(registerData)


/* stem */

const timestamp = Math.round(new Date().getTime() / 1000);

var seed = {            
         "name": 'YEED',
         "symbol": 'YEED',
         "property": 'currency',
         "type": 'immunity',
         "description": 'YEED is the currency used inside YGGDRASH. The vitality of the new branch chain is decided by the amount of YEED, which will be consumed gradually.',
         "tag": 0.1,
         "version": '0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0',
         "reference_address": '',
         "reserve_address": '0xcee3d4755e47055b530deeba062c5bd0c17eb00f',
         "owner": '0xA771A6b5A6cAbE2ca35Fd55631717d95049D6338',
         "timestamp": timestamp,
         "version_history":['0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0']
}

const branch = ygg.client.branch(seed);

let jsonBody = ygg.utils.dataToJson(branch);  

const txHeaderData = {
    "chain":`0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7`,
    "version":`0x0000000000000000`,
    "type":`0x0000000000000000`,
    "timeStamp":`0x${ygg.utils.decimalToHex(timestamp)}`,
    "bodyHash": `0x${ygg.utils.bodyHashHex(jsonBody)}`,
    "bodyLength":`0x${ygg.utils.decimalToHex(jsonBody.length)}`
  };

let tx = new ygg.tx(txHeaderData);

const signature = tx.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));

let registerData = tx.branchRegister(branch, signature, timestamp);

let register = ygg.client.register(registerData);

// console.log(register)
