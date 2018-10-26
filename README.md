# Yggdrash Javascript SDK
It is the Software Development Kit of Javascript, the most commonly used programming language in the world, to support the smooth development of developers.
The SDK includes libraries such as API clients, transaction methods for local signing, and important constants for ecosystems.

## Requirements
- Node.js - version 10.12.0
- NPM
- [YGGDRASH Node](https://github.com/yggdrash/yggdrash)

## Docs
[Documentation](./docs/index.md)

## Installation

### Node.js
```bash
npm install yggjs
```
### Usage
```
const yggjs = require('yggjs');
let ygg = new yggjs(new yggjs.providers.HttpProvider('http://localhost:8080'));
```

## License
This project is licensed under the [MIT License](LICENSE).
