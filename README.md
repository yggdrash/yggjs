# Yggdrash Javascript SDK

## Docs
[Documentation]() soon...

### Usage
```
if (typeof ygg !== 'undefined') {
    ygg = new Ygg(ygg.currentProvider);
} else {
    ygg = new Ygg(new Ygg.providers.HttpProvider('http://localhost:8080'));
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
