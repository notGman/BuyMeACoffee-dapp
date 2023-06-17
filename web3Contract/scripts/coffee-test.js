const hre = require("hardhat");

async function balance(addresses) {
  const provider = hre.ethers.provider;
  for (let i = 0; i < addresses.length; i++) {
    console.log(addresses[i], ": ", await provider.getBalance(addresses[i]));
  }
}

async function contractBalance(contractAddress) {
  const provider = hre.ethers.provider;
  const balance = await provider.getBalance(contractAddress);
  console.log(`Contract balance: ${hre.ethers.formatEther(balance)}`);
}

async function buyCoffee(name, message, tipAmmount, contract, tipper) {
  await contract.connect(tipper).coffee(name, message, { value: hre.ethers.parseEther(tipAmmount.toString()) });
}

async function ownerBalance(address) {
  const provider = hre.ethers.provider;
  console.log(await address, ": ", await provider.getBalance(address));
}

async function main() {
  const BuyMeACoffee = await hre.ethers.deployContract("BuyMeACoffee");
  await BuyMeACoffee.waitForDeployment();

  const contractAddress = await BuyMeACoffee.getAddress();
  console.log(`\nBuyMeACoffee deployed to ${contractAddress}`);

  const [owner, tipper1, tipper2] = await hre.ethers.getSigners();

  //Before tipping:
  console.log("\n===BEFORE TIPPING===");
  const addresses = [owner.address, tipper1.address, tipper2.address];
  await balance(addresses);

  //tipper1 tips owner
  console.log("\n===AFTER TIPS===");
  await contractBalance(contractAddress);
  //   const tip = { value: hre.ethers.parseEther("0.0001") };
  //   await BuyMeACoffee.connect(tipper1).coffee("Gman", "Have a nice day", tip);
  //   await balance(addresses);
  //   await contractBalance(contractAddress);
  await buyCoffee("Gman", "Hello World", 0.001, BuyMeACoffee, tipper1);
  await contractBalance(contractAddress);
  await buyCoffee("notGman", "Yo xoxo", 0.02, BuyMeACoffee, tipper2);
  await contractBalance(contractAddress);
  await balance(addresses);
  console.log(
    `Current amount in contract: ${hre.ethers.formatEther(await BuyMeACoffee.connect(owner).getContractBalance())}`
  );

  //withdraw
  console.log("\n===AFTER WITHDRAW===");
  await BuyMeACoffee.connect(owner).withdraw();
  await ownerBalance(owner.getAddress());
  await contractBalance(contractAddress);

  //Get contributors
  console.log("\n===CONTRIBUTORS===");
  console.log(await BuyMeACoffee.connect(owner).getContributors());

  //Get contract balance
  console.log("\n===CONTRACT BALANCE===");
  console.log(`Current amount in contract: ${await BuyMeACoffee.connect(owner).getContractBalance()}`);
}

main().catch((err) => {
  console.log(err.message);
});
