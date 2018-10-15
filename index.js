var Ygg = require('./lib/ygg');

if (typeof window !== 'undefined' && typeof window.Ygg === 'undefined') {
    window.Ygg = Ygg;
}

module.exports = Ygg;

ygg = new Ygg(new Ygg.providers.HttpProvider("http://localhost:8080"));

const timestamp = Math.round(new Date().getTime() / 1000);

/* balance */

// let val = ygg.client.getBalance('716af5c8960360c80ab29e2f76638bf299ac0bed', '0xa771a6b5a6cabe2ca35fd55631717d95049d6338');
// console.log("val", val);


/* transfer */

// var to = '0xaca4215631187ab5b3af0d4c251fdf45c79ad3c6';
// var amount = 1001;

// const transfer = ygg.client.transfer(to, amount);

// let jsonBody = ygg.utils.dataToJson(transfer)

// let branchId = Buffer.from('d588b45c0afdcdffca62323bc1783e02f625666e', 'hex').toString('hex')

// const txHeaderData = {
//     "chain":`0x${branchId}`,
//     "version":`0x0000000000000000`,
//     "type":`0x0000000000000000`,
//     "timeStamp":`0x${ygg.utils.decimalToHex(timestamp)}`,
//     "bodyHash": `0x${ygg.utils.bodyHashHex(jsonBody)}`,
//     "bodyLength":`0x${ygg.utils.decimalToHex(jsonBody.length)}`
// };

// let tx = new ygg.tx(txHeaderData);

// tx.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));

// let serialize = tx.serialize(transfer, branchId);

// console.log(serialize)

// ygg.client.sendTransaction(serialize)



/* stem */

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
         "version_history":['0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0']
}

const branch = ygg.client.branch(seed);

let jsonBody = ygg.utils.dataToJson(branch);  

const txHeaderData = {
    "chain":`0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7`,
    "version":`0x0000000000000000`,
    "type":`0x0000000000000000`,
    "timeStamp":`0x${ygg.utils.decimalToHex(branch.params[0].branch.timestamp)}`,
    "bodyHash": `0x${ygg.utils.bodyHashHex(jsonBody)}`,
    "bodyLength":`0x${ygg.utils.decimalToHex(jsonBody.length)}`
};

let tx = new ygg.tx(txHeaderData);

tx.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));

let serialize = tx.serialize(branch);

// let register = ygg.client.register(serialize);

// console.log(register)
