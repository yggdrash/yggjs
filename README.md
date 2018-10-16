# Yggdrash Javascript SDK

## Docs
[Documentation](https://yggdrash.atlassian.net/wiki/spaces/DEV/pages/32768001/SDK)

### Usage
```
var Yggdrash = require('ygg');

let ygg = new Yggdrash(new Yggdrash.providers.HttpProvider('http://localhost:8080'));

```

###
Example
#### getBranch
```
ygg.client.getBranch(branchName);

//a771a6b5a6cabe2ca35fd55631717d95049d6338
```

#### getBalance
```
let branchId = 'a771a6b5a6cabe2ca35fd55631717d95049d6338';
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
