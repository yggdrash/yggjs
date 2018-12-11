const Ygg = require('./lib/ygg');

if (typeof window !== 'undefined' && typeof window.Ygg === 'undefined') {
    window.Ygg = Ygg;
}

// module.exports = Ygg;

ygg = new Ygg(new Ygg.providers.HttpProvider("http://localhost:8080"))

// ygg.client.specification('91b29a1453258d72ca6fbbcabb8dca10cca944fb').then((d)=>console.log(d))
// ygg.client.getBalance('d872b5a338b824dc56abc6015543496670d81c1b', 'c91e9d46dd4b7584f0b6348ee18277c10fd7cb94').then((d)=>console.log(d))
ygg.client.allowance('cee3d4755e47055b530deeba062c5bd0c17eb00f', '1a0cdead3d1d1dbeef848fef9053b4f0ae06db9e').then((d)=>console.log(d))
