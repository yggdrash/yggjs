const Ygg = require('./lib/ygg')
const Transaction = require('./lib/v2/Transaction')

module.exports = {
    Ygg,
    Transaction,
    Wallet: Ygg.Wallet
}
