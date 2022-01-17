// deploy parameters
// localhost
import "dotenv/config"
import { ethers }  from "hardhat"
const maxSupply = process.env.MAX_SUPPLY;
const wallet = process.env.RECEIVE_WALLET_ADDRESS;

// mainnet or testnet
// const maxSupply = 10000;
// const wallet = "???"     

module.exports = async ({
    getNamedAccounts,
    deployments,
  }) => {
    const { deploy, execute } = deployments;
    const { deployer } = await getNamedAccounts();

    // deploy
    const misfit = await deploy("Misfit", {
      from: deployer,
      args: [200,10000,200,ethers.utils.parseEther('0.07')]
    });
    // check
    const { read } = deployments;
    console.log("Misfit address:", misfit.address);
    console.log("Misfit owner: ", (await read("Misfit", "owner")));

  };