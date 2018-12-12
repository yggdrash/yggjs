const Ygg = require('./lib/ygg');

if (typeof window !== 'undefined' && typeof window.Ygg === 'undefined') {
    window.Ygg = Ygg;
}

module.exports = Ygg;

// ygg = new Ygg(new Ygg.providers.HttpProvider('http://localhost:8080'))
// ygg.client.getBranchId().then((d) => console.log(d))
// ygg.client.specification('118eaa393958caf8e8c103fa9d78b5d2ded53109').then((d)=>console.log(d))
// ygg.client.totalSupply('118eaa393958caf8e8c103fa9d78b5d2ded53109').then((d)=>console.log(d))
// ygg.client.getBalance('118eaa393958caf8e8c103fa9d78b5d2ded53109', 'c91e9d46dd4b7584f0b6348ee18277c10fd7cb94').then((d)=>console.log(d))
// ygg.client.allowance('118eaa393958caf8e8c103fa9d78b5d2ded53109', 'cee3d4755e47055b530deeba062c5bd0c17eb00f', '1a0cdead3d1d1dbeef848fef9053b4f0ae06db9e').then((d)=>console.log(d))