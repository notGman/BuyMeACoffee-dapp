const hre = require("hardhat");

async function main() {
  const BuyMeACoffee = await hre.ethers.deployContract("BuyMeACoffee");
  await BuyMeACoffee.waitForDeployment();
  console.log(`Contract deployed to ${await BuyMeACoffee.getAddress()}`);
}

main().catch((err) => {
  console.log(err);
});
