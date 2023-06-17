import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import ABI from "../../web3Contract/artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json";
import { ContractAddress } from "../config.js";
import Users from "./Users";

const App = () => {
  const [account, setAccount] = useState("");
  const [coffee, setCoffee] = useState({
    name: "",
    message: "",
    tip: 0.001,
  });
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    if (!window.ethereum) {
      console.log("Ethereum not installed");
      return;
    }
    if (!account) {
      getAccount();
      getContributions();
      return;
    }
  }, []);

  const getAccount = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setAccount(signer.address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coffee.name || !coffee.message || !coffee.tip) {
      console.log("All fields are required");
      return;
    }
    try {
      const { ethereum } = window;
      if (ethereum) {
        const porvider = new ethers.BrowserProvider(ethereum);
        const signer = await porvider.getSigner();
        const CoffeeContract = new ethers.Contract(ContractAddress, ABI.abi, signer);
        await CoffeeContract.coffee(coffee.name, coffee.message, {
          value: ethers.parseEther(coffee.tip.toString()),
        }).then(() => console.log("Tip sent"));
      } else {
        console.log("Metamask is not installed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getContributions = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const CoffeeContract = new ethers.Contract(ContractAddress, ABI.abi, signer);
        const contributions = await CoffeeContract.getContributors();
        setContributors(contributions);
        console.log(contributions);
      } else {
        console.log("Metamask is not installed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (!account) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div
          className="bg-[#FBFB00] border-[3px] border-[#FFEE00] rounded-xl hover:bg-[#FFEE00] shadow-lg text-black"
          onClick={getAccount}>
          <button className="p-4 font-[600]">Connect to MetaMask Wallat</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full flex justify-center mt-[10em]">
        <div className="p-4 md:w-[30%] bg-[#111111]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col pb-3">
              <label className="text-lg font-[600]" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id=""
                value={coffee.name}
                onChange={(e) => setCoffee({ ...coffee, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col pb-3">
              <label className="text-lg font-[600]" htmlFor="message">
                Message:
              </label>
              <input
                type="text"
                name="message"
                id=""
                value={coffee.message}
                onChange={(e) => setCoffee({ ...coffee, message: e.target.value })}
              />
            </div>
            <div className="flex flex-col pb-3">
              <label className="text-lg font-[600]" htmlFor="tip">
                Tip:
              </label>
              <input
                type="number"
                name="tip"
                id=""
                value={coffee.tip}
                onChange={(e) => setCoffee({ ...coffee, tip: e.target.value })}
              />
            </div>
            <button
              typeof="submit"
              className="text-black w-full font-[600] cursor-pointer text-center bg-[#FBFB00] border-[3px] border-[#FFEE00] rounded-lg hover:bg-[#FFEE00] shadow-lg p-3">
              Buy Coffee
            </button>
          </form>
        </div>
      </div>
      <div>
        <div className="my-10 md:mx-28 text-2xl font-[600]">CONTRIBUTORS</div>
        {contributors &&
          contributors.map((user) => {
            return <Users name={user[1]} message={user[2]} address={user[0]} />;
          })}
      </div>
    </div>
  );
};

export default App;
