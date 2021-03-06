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
* [wallet](#ygg.wallet)
    - [create]()
    - [getPrivateKey]()
    - [signTx]()
    - [signWithPK]()
* [hdwallet](#ygg.hdwallet)
    - [fromMasterSeed]()
    - [getWallet]()
    - [getAddressString]()
* [nodeWallet](#ygg.nodeWallet) (Not implemented yet)
    - [lockAccount]()
    - [unlockAccount]()
    - [newAccount]()
    - [sign]()
* [client](#wygg.client)
    - [getBranches](#ygg.client.getBranches)
    - [getBranch](#ygg.client.getBranch)
    - [query](#ygg.client.query)
    - [transferBody](#ygg.client.transferBody)
    - [transferFromBody](#ygg.client.transferFromBody)
    - [approveBody](#ygg.client.approveBody)
    - [sendTransaction](#ygg.client.sendTransaction)
    - [getTransactionReceeipt](#ygg.client.getTransactionReceeipt)
    - [faucet](#ygg.client.faucet)
* [transaction](#ygg.tx)
    - [tx](#ygg.tx)
    - [sign](#ygg.sign)
    - [getTxHash](#ygg.getTxHash)
    - [vrs](#ygg.vrs)
    - [serialize](#ygg.serialize)
* [utils](#ygg.utils)
    - [bodyHash(hexString)](#ygg.utils.bodyHash)
    - [jsonToArrayString(hexString)](#ygg.utils.jsonToArrayString)
    - [decimalToHex(number)](#ygg.utils.decimalToHex)
    - [sha3(string, options)](#ygg.utils.sha3)
    - [keccak(string|number|buffer)](#ygg.utils.keccak)
    - [toHex(stringOrNumber)](#ygg.utils.tohex)
    - [toDecimal(hexString)](#ygg.utils.todecimal)
    - [fromDecimal(number)](#ygg.utils.fromdecimal)
    - [bigNumber(number)](#ygg.utils.bigNumber)
    - [isAddress(hexString)](#ygg.utils.isaddress)

   
## Usage

## YGG
    The `yggjs` object provides all methods.
Should be called to set provider.
#### Example
```js
let yggjs = require('@yggdrash/sdk');
// create an instance of yggjs using the HTTP provider.
let ygg = new yggjs(new yggjs.providers.HttpProvider("http://localhost:8080"));
```
#### Example using HTTP Basic Authentication
```js
let yggjs = require('@yggdrash/sdk');
let ygg = new yggjs(new .providers.HttpProvider("http://localhost:8080", 0, BasicAuthUsername, BasicAuthPassword));
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
let version = ygg.version.node;
console.log(version); // "ygg/v0.0.3/"
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
let version = ygg.version.network;
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
let peerCount = ygg.net.peerCount;
console.log(peerCount); // 4
```
***
## ygg.wallet
### ygg.wallet.create 
#### Parameters
`String` - password
#### Returns
`String` - address
`Object` - key store date
#### Example
```js
const { address, keystoreData } = ygg.wallet.create('password')
console.log(address); //a771a6b5a6cabe2ca35fd55631717d95049d6338
console.log(keystoreData); //{"version":3,"id":"9afbb249-55cb-485d-97a4-bf5d04efd68c","address":"2242ed1b42bd3fc1b03a078c508cd1d59d246114","crypto":{"ciphertext":"7aec4822b09ce9ebf25dad588dca9b620168bae048cf26cc39c1b66767c563c1","cipherparams":{"iv":"cc22c2d52d41ace21f679a22f67b94b8"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"5fbe7560f23b228ef5e3ba743da8ff1348be212838f61df65f1269d2c9ee8a2c","n":4096,"r":8,"p":1},"mac":"bea46ca2c6cfe48e2f24756b8eac2e8f148f8bb3324cc724b6c090ad86aec499"}}
```
***
### ygg.wallet.getPrivateKey
#### Parameters
`Object` - key store date
`String` - password
#### Returns
`String` - private keuy
#### Example
```js
const privateKey = ygg.wallet.getPrivateKey(keystoreData, 'password');
console.log(privateKey); //3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E
```
*** 
### ygg.wallet.signTx 
#### Parameters
`Object` - key store date
`String` - password
`Buffer` - transaction header massage
#### Returns
`Buffer` - signature
#### Example
```js
const signature = ygg.wallet.signTx(keystoreData, 'password', msg)
console.log(signature)
/*
{ r: <Buffer 8d f1 b6 5d 26 ae af 39 50 35 36 f2 24 f7 8d 3f 36 31 eb f3 ba 7b f5 44 25 78 c2 3d f3 e5 7c c3>,
  s: <Buffer 59 65 dd 3c 79 04 f0 cf c3 d6 36 15 66 a3 e8 a0 d8 fb b9 32 08 70 d9 c5 92 95 b2 06 8a 94 1d b3>,
  v: 28 }
*/
```
*** 
### ygg.wallet.signWithPK 
#### Parameters
`String` - password
`Buffer` - transaction header massage
#### Returns
`Buffer` - transaction header massage
#### Example
```js
const privateKey = '3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E'
const signature = ygg.wallet.signWithPK(privateKey, msg);
/*
{ r: <Buffer 8d f1 b6 5d 26 ae af 39 50 35 36 f2 24 f7 8d 3f 36 31 eb f3 ba 7b f5 44 25 78 c2 3d f3 e5 7c c3>,
  s: <Buffer 59 65 dd 3c 79 04 f0 cf c3 d6 36 15 66 a3 e8 a0 d8 fb b9 32 08 70 d9 c5 92 95 b2 06 8a 94 1d b3>,
  v: 28 }
*/
```
*** 

## ygg.hdwallet
### ygg.hdwallet.fromMasterSeed
Creates an hdkey object from a master seed buffer. Accepts an optional versions object.
#### Parameters
`Buffer` - seed word
#### Returns
`Object` - hdwallet information
#### Example
```js
let mnemonic = bip39.generateMnemonic();
const hdwallet =  ygg.hdwallet.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
const wallet = hdwallet.derivePath(HDpath).getWallet();
```
*** 

## ygg.client
### ygg.client.getBranch
View the branches registered on the stem
#### Parameters
none
#### Returns
`String` - branch id (network id)
#### Example
```js
let branchName = 'YEED';
ygg.client.getBranchId(branchName);
//a771a6b5a6cabe2ca35fd55631717d95049d6338
```

***
### ygg.client.getBranches
#### Returns
`Object` -  Branches
#### Example
```js
ygg.client.getBranches(contractVersion);
/*
{ 
  631187ab5b3af0d4c251fdf45c79ad3c6aca4215: {
    name: yggdrash,
    symbol: YEED,
    description: yggdrash blockchain,
    ...
    contract:[...]
    ...
  }
}
*/
```

***
### ygg.client.query
#### Returns
`Object` -  any
#### Example
원하는 메소드에 맞는 파라미터를 넣어서 쿼리문 작성
```js
let body = {
        branchId: "631187ab5b3af0d4c251fdf45c79ad3c6aca4215",
        contractVersion: "fdf45c79ad3c6aca4215631187ab5b3af0d4c251",
        method: 'balanceOf',
        params: {
            address: "215631187afdf45c79adb5b3af0d4c2513c6aca4"
        }
}
                
ygg.client.query(body);
```

***
### ygg.client.faucet
#### Parameters
`String` -  Contract Version
#### Returns
`Object` -  Transaction Hash
#### Example
```js
let contractVersion = '631187ab5b3af0d4c251fdf45c79ad3c6aca4215';

ygg.client.faucet(contractVersion);
/*
{ 
  contractVersion: '631187ab5b3af0d4c251fdf45c79ad3c6aca4215',
  method: 'faucet',
  params:
   {}
}
*/
```

***
### ygg.client.transferBody
body required when sending a transaction
#### Parameters
`String` -  Contract Version
`String` -  To address
`Number` -  Amount
#### Returns
`Object` -  body object
#### Example
```js
let contractVersion = '631187ab5b3af0d4c251fdf45c79ad3c6aca4215';
let toAddress = 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6';
let amount = 1004
 
ygg.client.transferBody(contractVersion, toAddress, amount);
/*
{ method: 'transfer',
  params:
   { 
     contractVersion: '631187ab5b3af0d4c251fdf45c79ad3c6aca4215',
     address: 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6',
     amount: 1004
   }
}
*/
```
***

***
### ygg.client.transferFromBody
body required when sending a transaction
#### Parameters
`String` -  Contract Version
`String` -  From address
`String` -  To address
`Number` -  Amount
#### Returns
`Object` -  body object
#### Example
```js
let contractVersion = '631187ab5b3af0d4c251fdf45c79ad3c6aca4215';
let fromAddress = '7ab5b3af0d4c251fdf45c7aca4215631189ad3c6';
let toAddress = 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6';
let amount = 1004
 
const txBody = ygg.client.transferFromBody(contractVersion, fromAddress, toAddress, amount);
console.log(txBody);
/*
{ method: 'transferFrom',
  params:
   { 
     contractVersion: '631187ab5b3af0d4c251fdf45c79ad3c6aca4215',
     fromAddress: '7ab5b3af0d4c251fdf45c7aca4215631189ad3c6',
     toAddress: 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6',
     amount: 1004
   }
}
*/
```
***

***
### ygg.client.approveBody
body required when sending a transaction
#### Parameters
`String` -  Contract Version
`String` -  To address
`Number` -  Amount
#### Returns
`Object` -  body object
#### Example
```js
let contractVersion = '631187ab5b3af0d4c251fdf45c79ad3c6aca4215';
let spenderAddress = 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6';
let amount = 1004
 
const txBody = ygg.client.approveBody(contractVersion, spenderAddress, 1004);
console.log(txBody);
/*
{ method: 'approve',
  params:
   { 
     contractVersion: '631187ab5b3af0d4c251fdf45c79ad3c6aca4215',
     address: 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6',
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
const body = ygg.client.transferBody(to, amount);
let branchId = Buffer.from('d588b45c0afdcdffca62323bc1783e02f625666e', 'hex').toString('hex')
 
const rawTx = {
    "chain":`0x${branchId}`,
    "version":'0x0000000000000000',
    "type":'0x0000000000000000',
    "timeStamp":'0x000000005bada008',
    "bodyHash":'0xf2feb937f282f105a24e47a69fbd0d705be3771cce695247d391fa5b6f8a7608',
    "bodyLength":'0x000000000000028a'
}
 
let privateKey = Buffer.from('5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520', 'hex')
const tx = new ygg.tx(rawTx);
tx.sign(privateKey);
 
let serialize = tx.serialize(body);
 
ygg.client.sendTransaction(serialize).then((txHash) => {
    console.log("hash", txHash)   // ebbe3d2ae42f7fdf0d6f81bca7aec9cac79d58ee688d34ac75ef3a03cfc4d56b
})
```

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
 
let privateKey = Buffer.from('5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520', 'hex')
let tx = new ygg.tx(rawTx);
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
 
const privateKey = Buffer.from('5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520', 'hex')
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
 
const privateKey = Buffer.from('5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520', 'hex')
let tx = new ygg.tx(rawTx);
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
 
const txHeaderData = {
    "chain":`0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7`,
    "version":`0x0000000000000000`,
    "type":`0x0000000000000000`,
    "timeStamp":`0x${ygg.utils.decimalToHex(branch.params[0].branch.timestamp)}`,
    "bodyHash": `0x${ygg.utils.bodyHashHex(jsonBody)}`,
    "bodyLength":`0x${ygg.utils.decimalToHex(jsonBody.length)}`
};
 
let privateKey = Buffer.from('5654f359c90004451a32dfd0286e61d1944b5a1ecde05808c11138c0c2c26520', 'hex')
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
let bodyHash = ygg.utils.bodyHashHex(branch)

console.log(bodyHash)
//a4ab4d1dff1130d3d9861285a80dfb325737e892c2f8d534ff1858833d871d70
```
***
### ygg.utils.jsonToArrayString
#### Parameters
`String` - body data
#### Returns
`Object` -  body
#### Example
```js
let jsonBody = ygg.utils.jsonToArrayString(branch);
console.log(jsonBody)
//{"method":"TRANSFER","params":[{"address":"60212061e7bf6fba4b0607fc9c1f8bbb930d87d0","amount":"1004"}]}]
```
***
### ygg.utils.decimalToHex
#### Parameters
`Number` - Convert decimal to 8-byte hex string
#### Returns
`String` -  8-byte hex string
#### Example
```js
let hex = ygg.utils.decimalToHex(1540798630385)
console.log(hex) // 00000166beef066e
```
***
### ygg.utils.sha3
#### Parameters
`String` - The string to hash using the SHA3 algorithm
#### Returns
`String` - SHA3 of the given data.
#### Example
```js
let hash = ygg.utils.sha3("Some string to be hashed");
console.log(hash); // "0xbf5ea52511be400262ab4d0b8e9f5993d3bc02abefe58ec7c87c81c8ae60ef22"
let hashOfHash = ygg.utils.sha3(hash, {encoding: 'hex'});
console.log(hashOfHash); // "0xbf5ea52511be400262ab4d0b8e9f5993d3bc02abefe58ec7c87c81c8ae60ef22"
```
***
### ygg.utils.keccak
#### Parameters
`String | Buffer | Number` - The string to hash using the Keccak-256 SHA3 algorithm
#### Returns
`Buffer` - The Keccak-256 SHA3 of the given data.
#### Example
```js
let hash = ygg.utils.keccak("Some string to be hashed");
console.log(hash); // "3717ec34f5b0345c3b480d9cd402f0be1111c0e04cb9dbe1da5b933e353a5bba"
```
***
### ygg.utils.toHex
#### Parameters
`String|Number|Object|Array|BigNumber` - The value to parse to HEX.
#### Returns
`String` - The hex string 
#### Example
```js
let hex = ygg.utils.toHex({test: 'test'});
console.log(hex); // '0xa22746b227457374227d7657374223'
```
***
### ygg.utils.toDecimal
#### Parameters
`String` - A HEX string to be converted to a number.
#### Returns
`Number` - The number representing the data hexString.
#### Example
```js
let num = ygg.utils.toDecimal('0x16');
console.log(num); // 22
```
***
### ygg.utils.fromDecimal
#### Parameters
`String|Number` - A number to be converted to a HEX string.
#### Returns
`Number` - The HEX string representing of the given number.
#### Example
```js
let hex = ygg.utils.fromDecimal('22');
console.log(hex); // 0x16
```
***
### ygg.utils.bigNumber
#### Parameters
`String|Number` - A number, number string or HEX string of a number.
#### Returns
`BigNumber` - A BigNumber instance representing the given value.
#### Example
```js
let value = ygg.utils.bigNumber('100000000000000000000004');
console.log(value); // instanceOf BigNumber
console.log(value.toNumber()); // 1.0000000000000002e+23
console.log(value.toString(10)); // '100000000000000000000004'
```
***
### ygg.utils.isAddress
#### Parameters
`String` - A HEX string.
#### Returns
`Boolean` - **false** if it's not on a valid address format.
#### Example
```js
let isAddress = ygg.utils.isAddress('0xa771a6b5a6cabe2ca35fd55631717d95049d6338');
console.log(isAddress); // true
```