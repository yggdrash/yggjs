const Ygg = require('./lib/ygg');

// if (typeof window !== 'undefined' && typeof window.Ygg === 'undefined') {
//     window.Ygg = Ygg;
// }

// module.exports = Ygg;

ygg = new Ygg(new Ygg.providers.HttpProvider("http://localhost:8080"));

/* wallet */

// const { address, keystoreData } = ygg.wallet.create('password')
// const pk = ygg.wallet.getPrivateKey(keystoreData, 'password');

// console.log(address)
// console.log(pk.toString('hex'))
// console.log(keystoreData)

const HDpath = "m/44'/60'/0'/0/0";
const bip39 = require('bip39')
let mnemonic = bip39.generateMnemonic();
const hdwallet =  ygg.hdwallet.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
const wallet = hdwallet.derivePath(HDpath).getWallet();
const address = wallet.getAddressString();
console.log(address)

/* genesis */




/* block */

// let owner = '0xA771A6b5A6cAbE2ca35Fd55631717d95049D6338'
// let reserve_address = '0xf09e6313f6e5d835bb13d8cbf2e39829083b5d03' //node wallet author
// var seed = {            
//          "name": 'YEED',
//          "symbol": 'YEED',
//          "property": 'currency',
//          "type": 'immunity',
//          "description": 'YEED is the currency used inside YGGDRASH. The vitality of the new branch chain is decided by the amount of YEED, which will be consumed gradually.',
//          "tag": 0.1,
//          "version": '0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0',
//          "reference_address": '',
//          "reserve_address": reserve_address,
//          "owner": owner,
//          "version_history":['0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0']
// }
// const body = ygg.client.branch(seed);

// let jsonBody = ygg.utils.dataToJson(body);  
// // console.log(branch)
// // console.log(JSON.parse(jsonBody)[0])

// const rawTx = {
//     "chain":`0x${body.params[0].branchId}`,
//     "version":`0x0000000000000000`,
//     "type":`0x0000000000000000`,
//     "timeStamp":`0x${ygg.utils.decimalToHex(new Date().getTime())}`,
//     "bodyHash": `0x${ygg.utils.bodyHashHex(jsonBody)}`,
//     "bodyLength":`0x${ygg.utils.decimalToHex(jsonBody.length)}`
// };
// let tx = new ygg.tx(rawTx);
// tx.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));
// let txBody = tx.serialize(body);
// let blockBody = ygg.utils.dataToJson(txBody);

// const rawBlock = {
//     "chain":`0x${body.params[0].branchId}`,
//     "version":`0x0000000000000000`,
//     "type":`0x0000000000000000`,
//     "timeStamp":`0x${ygg.utils.decimalToHex(new Date().getTime())}`,
//     "bodyHash": `0x${ygg.utils.bodyHashHex(blockBody)}`,
//     "bodyLength":`0x${ygg.utils.decimalToHex(blockBody.length)}`
// };

// let block = new ygg.block(rawBlock);
// block.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));
// let serialize = block.serialize(txBody);
// console.log(serialize)

/* merkle */
// const { sha3 } = require('./lib/local/utils')
// const merkle = require('./lib/local/utils/merkle');

// let tx =[
//     "fd636107ceb6de2486331ad662955d09abf0414079f2ea59f12da2cfa15c4561",
//     "088b7d88355a96633fb9586806d75d9c7e6e08b8ddaea8155f4be5ef180df3a7"
// ].map(x => new Buffer(x, 'hex'))

// console.log(merkle(tx, sha3).toString('hex'));

// let tx =[
//     "fd636107ceb6de2486331ad662955d09abf0414079f2ea59f12da2cfa15c4561",
//     "088b7d88355a96633fb9586806d75d9c7e6e08b8ddaea8155f4be5ef180df3a7"
// ]
// var tree = merkle('keccak256').sync(tx);
// console.log(tree.root().toString('hex'))
// console.log(tree.depth())
// console.log(merkle.YggdrashMerkleRoot(tx));


// var MerkleTools = require('./lib/local/utils/merkle')
// var treeOptions = {
//     hashType: 'KECCAK-256' // optional, defaults to 'sha256'
//   }
// var merkleTools = new MerkleTools(treeOptions)
// merkleTools.addLeaf('fd636107ceb6de2486331ad662955d09abf0414079f2ea59f12da2cfa15c4561')
// merkleTools.addLeaf('088b7d88355a96633fb9586806d75d9c7e6e08b8ddaea8155f4be5ef180df3a7')
// merkleTools.makeTree()
// console.log(merkleTools.getMerkleRoot().toString('hex'))

/* get balance */
// let val = ygg.client.getBalance('0a39170899bd7e721730c7c312afc154d784034b', '0xaca4215631187ab5b3af0d4c251fdf45c79ad3c6')
/* get branch */
// ygg.client.getBranchId('YEED');
/* node Hello */
// let body = ygg.client.nodeHello();
// let bodyJson = ygg.utils.dataToJson(body)
// const rawTx = {
//     "timeStamp":`0x${ygg.utils.decimalToHex(new Date().getTime())}`,
//     "nonce":`0x${ygg.utils.nonce()}`,
//     "bodyHash":`0x${ygg.utils.bodyHashHex(bodyJson)}`,    
//     "bodyLength":`0x${ygg.utils.decimalToHex(bodyJson.length)}`
//   };
// let tx = new ygg.tx(rawTx);
// tx.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));
// let serialize = tx.serialize(body);
// // console.log("serialize", serialize)    
// // console.log("pubkey", tx.getSenderPublicKey().toString('hex'))
// ygg.client.getNonce(serialize).then((result) => {
//     // console.log("nonce", result)  
    
//     // let body = ygg.client.nodeRestart();
//     let body = ygg.client.nodeSetConfig(32921,"info");
//     let bodyJson = ygg.utils.dataToJson(body)
//     const rawTx = {
//         "timeStamp":`0x${ygg.utils.decimalToHex(new Date().getTime())}`,
//         "nonce":`0x${ygg.utils.nonce(result)}`,
//         "bodyHash":`0x${ygg.utils.bodyHashHex(bodyJson)}`,    
//         "bodyLength":`0x${ygg.utils.decimalToHex(bodyJson.length)}`
//     };
//     let tx = new ygg.tx(rawTx);
//     tx.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));
//     let serialize = tx.serialize(body);
//     console.log("serialize", serialize) 
//     ygg.client.requestCommand(serialize).then((result) => {
//         console.log("result", result)    
//     })
// })
/* transfer */
// var to = '0x60212061e7bf6fba4b0607fc9c1f8bbb930d87d0';
// var amount = 1004;
// const body = ygg.client.transfer(to, amount);
// let bodyJson = ygg.utils.dataToJson(body)
// let branchId = "9819a8ec0710bee412d8d26d0aa1ac70f2ed5802"
// const rawTx = {
//     "chain":`0x${ygg.utils.hexString(branchId)}`,
//     "version":`0x${ygg.utils.hexString("0000000000000000")}`,
//     "type":`0x${ygg.utils.hexString("0000000000000000")}`,
//     "timeStamp":`0x${ygg.utils.decimalToHex(new Date().getTime())}`,
//     "bodyHash":`0x${ygg.utils.bodyHashHex(bodyJson)}`,
//     "bodyLength":`0x${ygg.utils.decimalToHex(bodyJson.length)}`
//   };
// let tx = new ygg.tx(rawTx);
// tx.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));
// let serialize = tx.serialize(body);
// console.log(serialize)
// ygg.client.sendTransaction(serialize).then((result) => {
//     console.log("hash", result)    
// })
/* stem */
// let owner = '0xA771A6b5A6cAbE2ca35Fd55631717d95049D6338'
// let reserve_address = '0xf09e6313f6e5d835bb13d8cbf2e39829083b5d03' //node wallet author
// var seed = {            
//          "name": 'YEED',
//          "symbol": 'YEED',
//          "property": 'currency',
//          "type": 'immunity',
//          "description": 'YEED is the currency used inside YGGDRASH. The vitality of the new branch chain is decided by the amount of YEED, which will be consumed gradually.',
//          "tag": 0.1,
//          "version": '0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0',
//          "reference_address": '',
//          "reserve_address": reserve_address,
//          "owner": owner,
//          "version_history":['0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0']
// }
// const branch = ygg.client.branch(seed);
// let jsonBody = ygg.utils.dataToJson(branch);  
// const rawTx = {
//     "chain":`0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7`,
//     "version":`0x0000000000000000`,
//     "type":`0x0000000000000000`,
//     "timeStamp":`0x${ygg.utils.decimalToHex(new Date().getTime())}`,
//     "bodyHash": `0x${ygg.utils.bodyHashHex(jsonBody)}`,
//     "bodyLength":`0x${ygg.utils.decimalToHex(jsonBody.length)}`
// };
// let tx = new ygg.tx(rawTx);
// tx.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));
// let serialize = tx.serialize(branch);
// console.log(serialize)
// ygg.client.plant(serialize).then((result) => {
//     console.log("hash", result)    
// })