const Ygg = require('./lib/ygg');

if (typeof window !== 'undefined' && typeof window.Ygg === 'undefined') {
    window.Ygg = Ygg;
}

module.exports = Ygg;


ygg = new Ygg(new Ygg.providers.HttpProvider('http://localhost:8080'))
let timestamp = new Date().getTime()

const body = ygg.client.txBody('18D5dACb8f793d7aEA95f24008067D0E004eac11', 1000)
let bodyJson = ygg.utils.dataToJson(body)

const rawTx = {
    "chain":`0x118eaa393958caf8e8c103fa9d78b5d2ded53109`,
    "version":`0x0000000000000000`,
    "type":`0x0000000000000000`,
    "timeStamp":`0x${ygg.utils.decimalToHex(timestamp)}`,
    "bodyHash":`0x${ygg.utils.bodyHashHex(bodyJson)}`,
    "bodyLength":`0x${ygg.utils.decimalToHex(bodyJson.length)}`
  };

const tx = new ygg.tx(rawTx)
tx.sign(Buffer.from('7c2b4f805c3bbce62cffe6e6682334ec39b12ff7946f3390f852713292411865', 'hex'))
let serialize = tx.serialize(body)
console.log(serialize)

ygg.client.sendTransaction(serialize).then((result) => {
    console.log(`  ` + `==> Transaction Hash : ${result}`)
})