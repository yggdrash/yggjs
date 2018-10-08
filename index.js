var Ygg = require('./lib/ygg');

if (typeof window !== 'undefined' && typeof window.Ygg === 'undefined') {
    window.Ygg = Ygg;
}

// module.exports = Ygg;

var ygg = new Ygg('localhost:8080');

let val = ygg.yggjs.getBalance('0xa771a6b5a6cabe2ca35fd55631717d95049d6338');
console.log(val);