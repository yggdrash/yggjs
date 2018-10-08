var Ygg = require('./lib/ygg');

if (typeof window !== 'undefined' && typeof window.Ygg === 'undefined') {
    window.Ygg = Ygg;
}

// module.exports = Ygg;

if (typeof ygg !== 'undefined') {
    ygg = new Ygg(ygg.currentProvider);
} else {
    // Set the provider you want from Web3.providers
    ygg = new Ygg(new Ygg.providers.HttpProvider("http://localhost:8080"));
    let val = ygg.yggjs.getBalance('0xa771a6b5a6cabe2ca35fd55631717d95049d6338');
    console.log(val);
}