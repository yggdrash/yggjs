# Yggdrash Javascript SDK

## Docs
[Documentation](https://yggdrash.atlassian.net/wiki/spaces/DEV/pages/32768001/SDK)

### Usage
```
var Yggdrash = require('ygg');

if (typeof ygg !== 'undefined') {
    ygg = new Yggdrash(ygg.currentProvider);
} else {
    ygg = new Yggdrash(new Yggdrash.providers.HttpProvider('http://localhost:8080'));
}
```
```
let ygg = new Yggdrash(new Yggdrash.providers.HttpProvider('http://localhost:8080'));
```

###
Example
#### getBalance
```
let branchId = 'a771a6b5a6cabe2ca35fd55631717d95049d6338';
let address = 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6';

ygg.client.getBalance(branchId, address);
```

#### branch
```
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
```

#### register
```
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
const signature = tx.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));
let registerSerialize = tx.branchRegister(branch, signature);

let register = ygg.client.register(registerSerialize);
```

## Installation

### Node.js

```bash
npm install ygg
```


### Requirements

* Node.js
* npm
