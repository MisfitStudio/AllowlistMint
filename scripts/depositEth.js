const hardhat = require("hardhat");
const { ethers } = hardhat;
const chalk = require('chalk');

require('dotenv/config');

async function depositETH() {


    console.log(chalk.blueBright("Start depositETH"))
    //set maxsupply 10
    let provider = new ethers.providers.InfuraProvider(process.env.NETWORK);
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    console.log("wallet address: ", wallet.address)

    // get contract
    const misfit = await ethers.getContract("Misfit")
    console.log("misfit address: ", misfit.address)

    let amount = ethers.utils.parseEther('1');
    let gas_limit = "0x100000"
    let tx = {
        from: wallet.address,
        to: misfit.address,
        // ... or supports ENS names
        // to: "ricmoo.firefly.eth",
    
        // We must pass in the amount as wei (1 ether = 1e18 wei), so we
        // use this convenience function to convert ether to wei.
        gasPrice: "8000000000",
        value: amount,
        gasLimit: gas_limit
    };
    
    let sendTx = await wallet.sendTransaction(tx);
    await sendTx.wait()
    console.log("sent",sendTx)

    // console.log(chalk.green('Succesfully set devMint: ',process.env.METADATA_URI))

}
//ipfs://ouraccountid/projectid/

// every token's baseURI, ipfs://ouraccountid/projectid/tokenId

depositETH()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

