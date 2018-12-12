const Ygg = require('./lib/ygg');

if (typeof window !== 'undefined' && typeof window.Ygg === 'undefined') {
    window.Ygg = Ygg;
}

module.exports = Ygg;


ygg = new Ygg(new Ygg.providers.HttpProvider('http://localhost:8080'))
