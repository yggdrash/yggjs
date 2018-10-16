var Ygg = require('./lib/ygg');

if (typeof window !== 'undefined' && typeof window.Ygg === 'undefined') {
    window.Ygg = Ygg;
}

module.exports = Ygg;

ygg = new Ygg(new Ygg.providers.HttpProvider("http://localhost:8080"));
// const timestamp = Math.round(new Date().getTime() / 1000);

/* balance */

// let val = ygg.client.getBalance('0a39170899bd7e721730c7c312afc154d784034b', '0xaca4215631187ab5b3af0d4c251fdf45c79ad3c6')

ygg.client.getBranch('YEED');
/* transfer */

// var to = '0x60212061e7bf6fba4b0607fc9c1f8bbb930d87d0';
// var amount = 1004;

// const body = ygg.client.transfer(to, amount);
// let bodyJson = ygg.utils.dataToJson(body)

// let branchId = "0a39170899bd7e721730c7c312afc154d784034b"

// const rawTx = {
//     "chain":`0x${ygg.utils.hexString(branchId)}`,
//     "version":`0x${ygg.utils.hexString("0000000000000000")}`,
//     "type":`0x${ygg.utils.hexString("0000000000000000")}`,
//     "timeStamp":`0x${ygg.utils.decimalToHex(timestamp)}`,
//     "bodyHash":`0x${ygg.utils.bodyHashHex(bodyJson)}`,
//     "bodyLength":`0x${ygg.utils.decimalToHex(bodyJson.length)}`
//   };

// let tx = new ygg.tx(rawTx);

// tx.sign(new Buffer('5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520', 'hex'));

// let serialize = tx.serialize(body, branchId);

// ygg.client.sendTransaction(serialize)

/* stem */

// var seed = {            
//          "name": 'YEED',
//          "symbol": 'YEED',
//          "property": 'currency',
//          "type": 'immunity',
//          "description": 'YEED is the currency used inside YGGDRASH. The vitality of the new branch chain is decided by the amount of YEED, which will be consumed gradually.',
//          "tag": 0.1,
//          "version": '0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0',
//          "reference_address": '',
//          "reserve_address": '0xcee3d4755e47055b530deeba062c5bd0c17eb00f',
//          "owner": '0xA771A6b5A6cAbE2ca35Fd55631717d95049D6338',
//          "version_history":['0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0']
// }

// const branch = ygg.client.branch(seed);

// let jsonBody = ygg.utils.dataToJson(branch);  

// const rawTx = {
//     "chain":`0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7`,
//     "version":`0x0000000000000000`,
//     "type":`0x0000000000000000`,
//     "timeStamp":`0x${ygg.utils.decimalToHex(branch.params[0].branch.timestamp)}`,
//     "bodyHash": `0x${ygg.utils.bodyHashHex(jsonBody)}`,
//     "bodyLength":`0x${ygg.utils.decimalToHex(jsonBody.length)}`
// };

// let tx = new ygg.tx(rawTx);

// tx.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));

// let serialize = tx.serialize(branch);

// ygg.client.plant(serialize).then((result) => {
//     console.log("hash", result)    
// })