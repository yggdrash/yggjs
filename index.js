const Ygg = require('./lib/ygg');

if (typeof window !== 'undefined' && typeof window.Ygg === 'undefined') {
    window.Ygg = Ygg;
}

module.exports = Ygg;

ygg = new Ygg(new Ygg.providers.HttpProvider("http://localhost:8080"));
const timestamp = new Date().getTime();
/* get balance */
// ygg.client.getBalance('0a39170899bd7e721730c7c312afc154d784034b', '0xaca4215631187ab5b3af0d4c251fdf45c79ad3c6').then(v => {
//     console.log(v)
// })
/* get branch */
ygg.client.getBranchId().then(all => {
    console.log(all)
})