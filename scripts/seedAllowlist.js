const hardhat = require("hardhat");
const { ethers } = hardhat;
const chalk = require('chalk');

require('dotenv/config');

async function seedAllowlist() {


    console.log(chalk.blueBright("Start allowlist"))
    //set maxsupply 10
    let provider = new ethers.providers.InfuraProvider(process.env.NETWORK);
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    console.log("wallet address: ", wallet.address)

    // @TODO think should be able to use hardhat's wallet providers for users as well
    const testPrivateKeys = process.env.TEST_PRIVATE_KEY.split(',')
    // get contract
    const misfit = await ethers.getContract("Misfit",wallet)
    console.log("misfit address: ", misfit.address)
    const allowList = testPrivateKeys.map((pk) => {
        const testWallet = new ethers.Wallet( pk, provider)
        console.log( "testWallet address: ", testWallet.address) 
        return testWallet.address
    });
    const numSlots = Array(testPrivateKeys.length).fill(3)
    console.log("allowList",allowList,numSlots)
    const tx = await misfit.seedAllowlist(allowList,numSlots);
    await tx.wait()
    console.log("allowlist",tx)
    // console.log(chalk.green('Succesfully set devMint: ',process.env.METADATA_URI))

}
//ipfs://ouraccountid/projectid/

// every token's baseURI, ipfs://ouraccountid/projectid/tokenId

seedAllowlist()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

