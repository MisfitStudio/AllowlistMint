const hardhat = require("hardhat");
const { ethers } = hardhat;
const chalk = require('chalk');

require('dotenv/config');

async function devMint() {
    const treasuryWallet = "0x544C59173333BD40B8F444785CeA1cC07bf72Fab"

    console.log(chalk.blueBright("Start devMint"))
    //set maxsupply 10
    let provider = new ethers.providers.InfuraProvider(process.env.NETWORK);
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    console.log("wallet address: ", wallet.address)

    // get contract
    const misfit = await ethers.getContract("Misfit")
    console.log("misfit address: ", misfit.address)

    const tx = await misfit.devMint(wallet.address,200);
    await tx.wait()
    console.log("devMint",tx)


    // const tx2 = await misfit.devMint(99);
    // await tx2.wait()
    // console.log("devMint2",tx2)
    // console.log(chalk.green('Succesfully set devMint: ',process.env.METADATA_URI))

}
//ipfs://ouraccountid/projectid/

// every token's baseURI, ipfs://ouraccountid/projectid/tokenId

devMint()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

