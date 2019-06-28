const Buffer = require('safe-buffer').Buffer
const { Ygg } = require('..')


let nodeUrl = "http://172.16.10.158:8073"
let ygg = new Ygg(new Ygg.providers.HttpProvider(nodeUrl))


let branchId = "3b898581ef0a6f172d31740c9de024101f1293a6";
let txId = "541bc5e1b39fcd520544a956c729bbc9809d10adc758663a5668b005ae06a899";

ygg.client.getTransactionReceipt(branchId, txId).then(res => {
    console.log("getTransactionReceipt")
    console.log(res)
})


ygg.client.getTransaction(branchId, txId).then(res => {
    console.log("getTransaction")
    console.log(res)
})
