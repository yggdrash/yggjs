# Yggdrash Javascript SDK

[Documentation]() soon...

### Usage
```
if (typeof ygg !== 'undefined') {
    ygg = new Ygg(ygg.currentProvider);
} else {
    // Set the provider you want from Web3.providers
    ygg = new Ygg(new Ygg.providers.HttpProvider("http://localhost:8080")); // default - http://localhost:8080
    console.log(ygg)
}
```

## Installation

### Node.js

```bash
npm install ygg
```


### Requirements

* Node.js
* npm
