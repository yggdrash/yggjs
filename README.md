# YGGDRASH Javascript SDK
It is the Software Development Kit of Javascript, the most commonly used programming language in the world, to support the smooth development of developers.
The SDK includes libraries such as API clients, transaction methods for local signing, and important constants for ecosystems.

## Requirements
- Node ≥ v10.12.0
- NPM ≥ v6.4.1
- Yarn ≥ 1.12.3
- [YGGDRASH Node](https://github.com/yggdrash/yggdrash)

## Docs
[Documentation](https://github.com/yggdrash/yggjs/tree/develop/docs)

## Installation

### Node.js
```bash
npm install @yggdrash/sdk
```
### Usage
```
const yggjs = require('@yggdrash/sdk');
let ygg = new yggjs(new yggjs.providers.HttpProvider('http://localhost:8080'));
```

## License
This project is licensed under [version 2.0 of the Apache License](LICENSE).
