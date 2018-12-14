const Wallet = require("./index")
const util = require("../utils")

const ksHelper = {
  create: function(password) {
    const wallet = Wallet.generate()    
    const address = wallet.getChecksumAddressString().slice(2)
    const params = {
      n: 4096
    }
    const keystoreData = wallet.toKeystore(password, params)
    return { address: address, keystoreData: keystoreData }
  },

  import: function(privateKey, password) {
    const wallet = Wallet.import(privateKey)    
    const address = wallet.getChecksumAddressString().slice(2)
    const params = {
      n: 4096
    }
    const keystoreData = wallet.toKeystore(password, params)
    return { address: address, keystoreData: keystoreData }
  },

  signTx: function(keystoreData, password, msg) {
    const signature = ksHelper.signWithPK(
      ksHelper.getPrivateKey(keystoreData, password),
      msg.toString("hex")
    )
    return signature
  },

  getPrivateKey: function(keystoreData, password) {
    return Wallet.fromKeystore(keystoreData, password).getPrivateKey()
  },

  signWithPK: function(privateKey, msg) {
    return util.ecsign(msg, privateKey)
  },

  fromPrivateKey: function(pk) {
    return Wallet.fromPrivateKey(util.toBuffer(`0x${pk}`))
  }
}

module.exports = ksHelper
