var Keypair = require("stellar-base").Keypair;
const fs = require('fs');
const { generateMnemonic, EthHdWallet } = require('eth-hd-wallet')
StellarHDWallet = require('stellar-hd-wallet')

const mnemonic = StellarHDWallet.generateMnemonic({entropyBits: 128})

// const xlmWallet = StellarHDWallet.fromMnemonic(mnemonic)
 
// var huatAmt = process.env.HUATAMT
// publicKey = xlmWallet.getPublicKey(0) // => GDKYMXOAJ5MK4EVIHHNWRGAAOUZMNZYAETMHFCD6JCVBPZ77TUAZFPKT
// console.log("New Mnemonic created");
// console.log("  Account ID: " + publicKey);
console.log("  Mnemonic: " + mnemonic)
// console.log("private key: " + xlmWallet.getSecret(0))




 
const ethWallet = EthHdWallet.fromMnemonic(mnemonic)

ethWallet.generateAddresses(1)
const ethPublicKey = ethWallet.getAddresses()[0] 
const privateKey = ethWallet.getPrivateKey(ethPublicKey)

console.log("  Eth Address:" + ethPublicKey)
console.log("  Eth privateKey:" + privateKey.toString('hex'))

