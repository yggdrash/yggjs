# YGGJS


 **NOTE: These docs are for yggjs version 0.0.1.**<br>
YGGJS is a collection of libraries which allow you to interact with a local or remote YGGDRASH node, using a HTTP connection.
To enable YGGDRASH Node, you can use the ygg object provided by the yggjs library.

**Contents**

- YGGDRASH JavaScript SDK
  - [Getting Started](#getting-started)
  - [ygg.js API Reference](#yggjs-api-reference)
## Getting Started
* [Adding ygg](#adding-ygg)

### Adding yggjs
First you need to get yggjs into your project. This can be done using the following methods:
- npm: `npm install @yggdrash/sdk`

```js
ygg = new yggjs(new yggjs.providers.HttpProvider("http://localhost:8080"));
```
## YGGJS API Reference
* [ygg](#ygg)
    - [isConnected()](#ygg.isconnected) (Not implemented yet)
    - [setProvider(provider)](#ygg.setProvider)
* [version](#ygg.version.api)
    - [api](#ygg.version.api)
    - [node/getNode]() (Not implemented yet)
    - [network/getNetwork]() (Not implemented yet)
* [net](#ygg.net) (Not implemented yet)
    - [listening/getListening]()
    - [peerCount/getPeerCount]()
* [wallet](#ygg.wallet) (Not implemented yet)
    - [lockAccount]()
    - [unlockAccount]()
    - [newAccount]()
    - [sign]()
* [client](#wygg.client)
    - [getBranch](#ygg.getBranch)
    - [getBalance](#ygg.getBalance)
    - [transfer](#ygg.transfer)
    - [sendTransaction](#ygg.sendTransaction)
    - [branch](#ygg.branch)
    - [plant](#ygg.plant)
    - [getBlocks](#ygg.getBlocks) (Not implemented yet)
    - [getBlockNumber](#ygg.getBlockNumber) (Not implemented yet)
    - [getTransaction](#ygg.getTransaction) (Not implemented yet)
    - [getTransactionFromBlock](#ygg.getTransactionFromBlock) (Not implemented yet)
    - [getTransactionReceipt](#ygg.getTransactionReceipt) (Not implemented yet)
* [transaction](#ygg.transaction)
    - [tx](#ygg.tx)
    - [sign](#ygg.sign)
    - [getTxHash](#ygg.getTxHash)
    - [vrs](#ygg.vrs)
    - [serialize](#ygg.serialize)
* [utils](#ygg.utils)
    - [bodyHash(hexString)](#ygg.utils.bodyHash)
    - [dataToJson(hexString)](#ygg.utils.dataToJson)
    - [sha3(string, options)](#ygg.utils.sha3)
    - [toHex(stringOrNumber)](#ygg.utils.tohex)
    - [toAscii(hexString)](#ygg.utils.toascii)
    - [fromAscii(textString)](#ygg.utils.fromascii)
    - [toDecimal(hexString)](#ygg.utils.todecimal)
    - [fromDecimal(number)](#ygg.utils.fromdecimal)
    - [isAddress(hexString)](#ygg.utils.isaddress)

   
## Usage

## YGG
    The `yggjs` object provides all methods.
Should be called to set provider.
#### Example
```js
let yggjs = require('yggjs');
// create an instance of yggjs using the HTTP provider.
let ygg = new yggjs(new yggjs.providers.HttpProvider("http://localhost:8080"));
```
#### Example using HTTP Basic Authentication
```js
var yggjs = require('yggjs');
var ygg = new yggjs(new .providers.HttpProvider("http://localhost:8080", 0, BasicAuthUsername, BasicAuthPassword));
//Note: HttpProvider takes 4 arguments (host, timeout, user, password)
```

***

### ygg.isConnected (Not implemented yet)
    ygg.isConnected()
Should be called to check if a connection to a node exists

#### Parameters
none

#### Returns
`Boolean`

#### Example
```js
if(!ygg.isConnected()) {
  
   // exeption
 } else {
 
   // filters
  
}
```
***

### ygg.setProvider
    ygg.setProvider(provider)
Should be called to set provider.

#### Parameters
none

#### Returns
`undefined`

#### Example
```js
ygg.setProvider(new yggjs.providers.HttpProvider('http://localhost:8080')); 
```

***

### ygg.version.api

#### Parameters
none

#### Returns
`String` - The yggdrash js api version.

#### Example
```js
let version = ygg.version.api;
console.log(version); // "0.0.1"
```
***
### ygg.version.node (Not implemented yet)

    ygg.version.node
   // or async
   ygg.version.getNode(callback(error, result){ ... })
#### Returns
`String` - The client/node version.
#### Example
```js
var version = ygg.version.node;
console.log(version); // "Mist/v0.9.3/darwin/go1.4.1"
```

***
### ygg.version.network (Not implemented yet)
     ygg.version.network
   // or async
   ygg.version.getNetwork(callback(error, result){ ... })
#### Parameters
none
#### Returns
`String` - The network protocol version.
#### Example
```js
var version = ygg.version.network;
console.log(version); // 54
```

***
## ygg.net 
### ygg.net.listening (Not implemented yet)
   ygg.net.listening
   // or async
   ygg.net.getListening(callback(error, result){ ... })
This property is read only and says whether the node is actively listening for network connections or not.
#### Parameters
none
#### Returns
`Boolean` - `true` if the client is actively listening for network connections, otherwise `false`.
#### Example
```js
let listening = ygg.net.listening;
console.log(listening); // true of false
```
***
### ygg.net.peerCount (Not implemented yet)
   ygg.net.peerCount
   // or async
   ygg.net.getPeerCount(callback(error, result){ ... })
 This property is read only and returns the number of connected peers.
#### Parameters
none
#### Returns
`Number` - The number of peers currently connected to the client.
#### Example
```js
var peerCount = ygg.net.peerCount;
console.log(peerCount); // 4
```
***
## ygg.wallet
### ygg.wallet.lockAccount (Not implemented yet)
### ygg.wallet.unlockAccount (Not implemented yet)
### ygg.wallet.newAccount (Not implemented yet)
### ygg.wallet.sign (Not implemented yet) 

## ygg.client
### ygg.client.getBranch
View the branches registered on the stem
#### Parameters

#### Returns
`String` - branch id (network id)
#### Example
```js
let branchName = 'YEED';
let branchId = ygg.client.getBranchId(branchName);
console.log(branchId); //a771a6b5a6cabe2ca35fd55631717d95049d6338
```
***
### ygg.client.getBalance
View balance in your account
#### Parameters

#### Returns
`String` -  `bignumber` balance value
#### Example
```js
let branchId = 'fe7b7c93dd23f78e12ad42650595bc0f874c88f7';
let toAddress = '0xaca4215631187ab5b3af0d4c251fdf45c79ad3c6';
 
let balance = ygg.client.getbalance(branchId, toAddress);
console.log(balance); // bignumber
```
***
### ygg.client.transfer
body required when sending a transaction
#### Parameters
`String` -  Branch ID
`String` -  To address
`Number` -  Amount
#### Returns
`Object` -  body object
#### Example
```js
let toAddress = 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6';
let amount = 1004
 
const transfer = ygg.client.transfer(toAddress, 1004);
console.log(transfer);
/*
{ method: 'transfer',
  params:
   { address: '0xaca4215631187ab5b3af0d4c251fdf45c79ad3c6',
     amount: 1004
   }
}
*/
```
***
### ygg.client.sendTransction
Sends a transaction to the network.
#### Parameters
`Object` - Transfer transaction data to branch
- txHeaderData option (ref ygg.tx)
- timestamp - timestamp 1/1000
- body length - serialized body length
- body - serialized json body
- author - The address that created the transaction
- hash - Transaction hash(sha3)
- type - 미정
- version - 미정
- body hash - The hashed value of the serialized body with sha3
- signature - transaction signatrue
#### Returns
`String` -  Transaction Hash
#### Example
```js
const body = ygg.client.transfer(to, amount);
let branchId = Buffer.from('d588b45c0afdcdffca62323bc1783e02f625666e', 'hex').toString('hex')
 
const rawTx = {
    "chain":'0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7',
    "version":'0x0000000000000000',
    "type":'0x0000000000000000',
    "timeStamp":'0x000000005bada008',
    "bodyHash":'0xf2feb937f282f105a24e47a69fbd0d705be3771cce695247d391fa5b6f8a7608',
    "bodyLength":'0x000000000000028a'
}
 
let privateKey = new Buffer('5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520', 'hex')
const tx = new ygg.tx(rawTx);
tx.sign(privateKey);
 
let serialize = tx.serialize(body, branchId);
 
ygg.client.sendTransaction(serialize).then((txHash) => {
    console.log("hash", txHash)   
})
/*
transaction hash
ebbe3d2ae42f7fdf0d6f81bca7aec9cac79d58ee688d34ac75ef3a03cfc4d56b
*/

```
***
### ygg.client.branch
body required when sending a stem transaction
#### Parameters
`Object` - seed infomation
#### Returns
`Object` - body data
#### Example
```js
var seed = {           
         "name": 'YEED',
         "symbol": 'YEED',
         "property": 'currency',
         "type": 'immunity',
         "description": 'YEED is the currency used inside YGGDRASH. The vitality of the new branch chain is decided by the amount of YEED, which will be consumed gradually.',
         "tag": 0.1,
         "version": '0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0',         //TO DO
         "reference_address": '0xcee3d4755e47055b530deeba062c5bd0c17eb00f',         //TO DO
         "reserve_address": '0xcee3d4755e47055b530deeba062c5bd0c17eb00f',          //TO DO, node wallet account
         "owner": 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6',
         "version_history":['0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0']       //TO DO
}
 
const branch = ygg.client.branch(seed);
console.log("body", branch)  
/*
{ method: 'create',
  params:
   [ { branchId: '3a9a851f91aeb790fc23a4b933ccf4c997b25b27',
       branch: { name: 'YEED',
                  symbol: 'YEED',
                  property: 'currency',
                  type: 'immunity',
                  description: 'YEED is the currency used inside YGGDRASH. The vitality of the new branch chain is decided by the amount of YEED, which will be consumed gradually.',
                  tag: 0.1,
                  version: '0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0',
                  reference_address: '0xcee3d4755e47055b530deeba062c5bd0c17eb00f',
                  reserve_address: '0xcee3d4755e47055b530deeba062c5bd0c17eb00f',
                  owner: 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6',
                  timestamp: 1539227945,
                  version_history:   [ '0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0' ]
                }
    } ]
}
*/
```
***
### ygg.client.plant
Sends a transaction to the stem network.
#### Parameters
`Object` - Transfer transaction data to branch
- txHeaderData option (ref ygg.tx)
- timestamp - timestamp 1/1000
- body length - serialized body length
- body - serialized json body
- author - The address that created the transaction
- hash - Transaction hash(sha3)
- type - 미정
- version - 미정
- body hash - The hashed value of the serialized body with sha3
- signature - transaction signatrue
#### Returns
`String` -  Transaction Hash
#### Example
```js
const body = ygg.client.branch(seed);
 
const rawTx = {
    "chain":'0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7',
    "version":'0x0000000000000000',
    "type":'0x0000000000000000',
    "timeStamp":'0x000000005bada008',
    "bodyHash":'0xf2feb937f282f105a24e47a69fbd0d705be3771cce695247d391fa5b6f8a7608',
    "bodyLength":'0x000000000000028a'
}
 
let privateKey = new Buffer('5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520', 'hex')
const tx = new ygg.tx(rawTx);
tx.sign(privateKey);
 
let serialize = tx.serialize(body);
 
ygg.client.plant(serialize).then((txHash) => {
    console.log("hash", txHash)   
})

/*
ebbe3d2ae42f7fdf0d6f81bca7aec9cac79d58ee688d34ac75ef3a03cfc4d56b
*/
```
***

#### ygg.client.getBlocks (Not implemented yet)
#### ygg.client.getBlockNumber (Not implemented yet)
#### ygg.client.getTransaction (Not implemented yet)
#### ygg.client.getTransactionFromBlock (Not implemented yet) 
#### ygg.client.getTransactionReceipt (Not implemented yet) 


## ygg.tx
### ygg.tx
**Buffer or Array or Object** a transaction can be initiailized with either a buffer containing the serialized transaction or an array of buffers relating to each of the tx Properties.Or lastly an Object containing the Properties of the transaction like in the example.For Object and Arrays each of the elements can either be a Buffer, a hex-prefixed (0x) String
#### Parameters
`Buffer` - chain - branch id
`Buffer` - version - transaction branch version
`Buffer` - type - transaction branch type
`Buffer` - timeStamp - transaction timestamp
`Buffer` - bodyHash - body hash
`Buffer` - bodyLength - body length
`Buffer` - v - EC signature parameter
`Buffer` - r - EC signature parameter
`Buffer` - s - EC recovery ID
#### Returns
`Object` - Transaction class
#### Example
```js

const branch = ygg.client.branch(seed);
let jsonBody = ygg.utils.dataToJson(branch)
 
const rawTx = {
    "chain":'0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7', // Branch ID or Network ID
    "version":'0x0000000000000000',
    "type":'0x0000000000000000',
    "timeStamp":`0x${ygg.utils.decimalToHex(timestamp)}`,                       
    "bodyHash": `0x${ygg.utils.bodyHashHex(jsonBody)}`,
    "bodyLength":`0x${ygg.utils.decimalToHex(jsonBody.length)}`
}
 
let tx = new ygg.tx(rawTx);
```
***
### ygg.tx.sign
Signs data using a specific account.
#### Parameters
`Buffer` - private key
#### Returns
`Buffer` - v - EC signature parameter
`Buffer` - r - EC signature parameter
`Buffer` - s - EC recovery ID
#### Example
```js
const rawTx = {
    "chain":'0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7',
    "version":'0x0000000000000000',
    "type":'0x0000000000000000',
    "timeStamp":'0x000000005bada008',
    "bodyHash":'0xf2feb937f282f105a24e47a69fbd0d705be3771cce695247d391fa5b6f8a7608',
    "bodyLength":'0x000000000000028a'
}
 
let privateKey = new Buffer('5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520', 'hex')
var tx = new ygg.tx(rawTx);
const signature = tx.sign(privateKey);

console.log(signature)
/*
{ r: <Buffer 8d f1 b6 5d 26 ae af 39 50 35 36 f2 24 f7 8d 3f 36 31 eb f3 ba 7b f5 44 25 78 c2 3d f3 e5 7c c3>,
  s: <Buffer 59 65 dd 3c 79 04 f0 cf c3 d6 36 15 66 a3 e8 a0 d8 fb b9 32 08 70 d9 c5 92 95 b2 06 8a 94 1d b3>,
  v: 28 }
*/
```
***
### ygg.tx.getTxHash

#### Parameters
none
#### Returns
`String` - transaction hash
#### Example
```js
const rawTx = {
    "chain":'0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7',
    "version":'0x0000000000000000',
    "type":'0x0000000000000000',
    "timeStamp":'0x000000005bada008',
    "bodyHash":'0xf2feb937f282f105a24e47a69fbd0d705be3771cce695247d391fa5b6f8a7608',
    "bodyLength":'0x000000000000028a'
}
 
const privateKey = new Buffer('5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520', 'hex')
const tx = new ygg.tx(rawTx);
tx.sign(privateKey);
let txHash = tx.getTxHash();
 
console.log(txHash) //ebbe3d2ae42f7fdf0d6f81bca7aec9cac79d58ee688d34ac75ef3a03cfc4d56b
```
***
### ygg.tx.vrs
#### Parameters
none
#### Returns
`String` - signature hex string 
#### Example
```js
const rawTx = {
    "chain":'0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7',
    "version":'0x0000000000000000',
    "type":'0x0000000000000000',
    "timeStamp":'0x000000005bada008',
    "bodyHash":'0xf2feb937f282f105a24e47a69fbd0d705be3771cce695247d391fa5b6f8a7608',
    "bodyLength":'0x000000000000028a'
}
 
const privateKey = new Buffer('5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520', 'hex')
var tx = new ygg.tx(rawTx);
tx.sign(privateKey);
 
let serializeSignature = tx.vrs();
 
console.log(serializeSignature)//1b4ee31e6f61c91e73a643bfa6b8980f7913ddba2f66272235f0430ed5b14e7e2472b7f5e48bcddeaaf45f930c0c147915666d34c19e29d02ad0f8b55e06111134

```
***
### ygg.tx.serialize

#### Parameters
`Object` - body data
#### Returns
`Object` - v - EC signature parameter
#### Example
```js
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
 
let privateKey = new Buffer('5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520', 'hex')
let tx = new ygg.tx(txHeaderData);
tx.sign(privateKey);
 
let serialize = tx.serialize(branch);
console.log(serialize)
/*
{
    "timestamp":'1537428487,',
    "bodyLength":'647',
    "body":'[{"method":"CREATE","params":[{"branchId":"15915bd4271a16929085efbb74e3af86ec1a8f7f","branch":{"name":"tedy","symbol":"TEDY","property":"ecosystem","type":"immunity","description":"The Basis of the YGGDRASH Ecosystem. It is also an aggregate and a blockchain               containing information of all Branch Chains.","tag":0.1,"version":"0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0","reference_address":"","reserve_address":"0xcee3d4755e47055b530deeba062c5bd0c17eb00f","owner":"aca4215631187ab5b3af0d4c251fdf45c79ad3c6","timestamp":1537428487,"version_history":["0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0"]}}]}]',
    "author":'aca4215631187ab5b3af0d4c251fdf45c79ad3c6',
    "hash":'58c018fdd3dcef83e1afea0f21141633b76fce37fbe4b27a2c42125a22cf9cb6',
    "chain":'fe7b7c93dd23f78e12ad42650595bc0f874c88f7',
    "type":'0000000000000000',
    "version":'0000000000000000',
    "bodyHash":'a4ab4d1dff1130d3d9861285a80dfb325737e892c2f8d534ff1858833d871d70',
    "signature":'1b9f35a8f7ee63e1d5b2cd043df801c6ead9530f6b001d53c2e80b43d87f4dc3d00ff3cf854f7f62bd3e3aa80b8bb958c48fe81edef285640c2dcce83617b5902c',
}
*/
```
***

## ygg.utils
### ygg.utils.bodyHash
Body hash for entering transaction headers
(Hashed body with sha3)
#### Parameters
`String` - serialized body data
#### Returns
`String` -  Hashed body with sha3
#### Example
```js
const branch = ygg.client.branch(seed);
let jsonBody = ygg.utils.dataToJson(branch);
let bodyHash = ygg.utils.bodyHashHex(jsonBody)

console.log(bodyHash)
//a4ab4d1dff1130d3d9861285a80dfb325737e892c2f8d534ff1858833d871d70
```
***
### ygg.utils.dataToJson
#### Parameters
`String` - body data
#### Returns
`Object` -  body
#### Example
```js
let jsonBody = ygg.utils.dataToJson(branch);
console.log(jsonBody)
//{"method":"TRANSFER","params":[{"address":"60212061e7bf6fba4b0607fc9c1f8bbb930d87d0","amount":"1004"}]}]
```
***
### ygg.utils.sha3
#### Parameters
`String` - 
#### Returns
`String` - The Keccak-256 SHA3 of the given data.
#### Example
```js
let jsonBody = ygg.utils.dataToJson(branch);
console.log(jsonBody)
//{"method":"TRANSFER","params":[{"address":"60212061e7bf6fba4b0607fc9c1f8bbb930d87d0","amount":"1004"}]}]
```
