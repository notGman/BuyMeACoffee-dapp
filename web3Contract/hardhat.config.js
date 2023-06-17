require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// 0xbBfddC4A31a729CC3b172d7B3f7142E1B380a9dE
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan:{
    apiKey:process.env.ETHERSCAN_API
  }
};
