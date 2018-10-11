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

###
Example
```
let branchId = '0xa771a6b5a6cabe2ca35fd55631717d95049d6338';
let address = 'aca4215631187ab5b3af0d4c251fdf45c79ad3c6';

ygg.client.getBalance(branchId, address);
```

## Installation

### Node.js

```bash
npm install ygg
```


### Requirements

* Node.js
* npm
