require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


const Alchemy_API_Key = "https://eth-rinkeby.alchemyapi.io/v2/7yAEJ_JpivaO-Yq6M_vs5EUL5N7LHhi3"
const Private_Key = "Your private Key will go here";
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  /*networks:{
    rinkeby: {
      url : `https://eth-rinkeby.alchemyapi.io/v2/7yAEJ_JpivaO-Yq6M_vs5EUL5N7LHhi3`,
      accounts : [`0x${Private_Key}`]
    }
  }*/
};
