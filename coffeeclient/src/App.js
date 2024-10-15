import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { useEffect } from 'react';
import { ethers } from "ethers";
//import abi from "./coffeedapp/artifacts/contracts/Counter.sol/Counter.json";
///Users/garimaaggarwal/Documents/blockchainPracticeProjects/coffeedapp/artifacts/contracts/Counter.sol/Counter.json
//import Counter from 'artifacts/contracts/Counter.sol/Counter.json'
import Counterinfo from "./contractsJson/Counter.json"
//const ethers = require("ethers")
const contractAddress = "0x4D955B7a07D4e5bE3A111d78a81e2Ff2e2ADfF98"; 
function App() {
  const [value, setValue] = useState();
  const [address, setAddress] = useState('');
  console. log("ethers version", ethers.version)
  //const connectToMetaMask = () => {}
  //const IncrementHandler = () => {}
  const DecrementHandler = () => {}
  //const ReadContractValue = () => {}
  const ConvertValue = () => {}

  /*useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      // MetaMask is connected
      const selectedAddress = window.ethereum.selectedAddress;
      console.log(`Connected to MetaMask with address: ${selectedAddress}`);
    } else {
      // MetaMask is not connected
      console.log('MetaMask is not connected');
    }
  }, []); */

  async function connectToMetaMask() {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access
        const Accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        console.log("Accounts", Accounts)
        setAddress(Accounts[0]);
        console.log('Connected to MetaMask!', Accounts);
      } else {
        console.error(
          'MetaMask not found. Please install MetaMask to use this application.',
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getAccount() {

    const activeAccount =''
    const showAccount = document.getElementById('showAccount')
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== activeAccount) {
      activeAccount = accounts[0];

    }
    showAccount.innerHTML = activeAccount;
  }


  async function disconnectFromMetaMask() {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Disconnect from MetaMask
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });
        console.log('Disconnected from MetaMask!');
      } else {
        console.error(
          'MetaMask not found. Please install MetaMask to use this application.',
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  const IncrementHandler = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const Signer = provider.getSigner();

        const Contract = new ethers.Contract(contractAddress, Counterinfo.abi, Signer);

        const Tx = await Contract.increment();
        const TxRecit = await Tx.wait();
        console.log('after :', TxRecit);
      } else {
        console.error(
          'MetaMask not found. Please install MetaMask to use this application.',
        );
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const ReadContractValue = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const Signer = provider.getSigner();

        // Create a new instance of the Contract class
        const Contract = new ethers.Contract(contractAddress, Counterinfo.abi, Signer);

        // Call the getValue function from the contract
        const Tx = await Contract.getValue();
        console.log('Tx :', Tx);

        setValue(Tx._hex);
      } else {
        console.error(
          'MetaMask not found. Please install MetaMask to use this application.',
        );
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };




return (
    <div className="App">


      <div className="connectBtns">
        <button className="btn" onClick={connectToMetaMask}>
          Connect To MetaMask
        </button>
      </div>

      <div>
        <button onClick={getAccount}>
          See all accounts
          <div id = "showAccount">

          </div>
        </button>
      </div>

      <div className="display">
        <p className="key">
          Address: <span className="value">{address}</span>
        </p>

        <div className="valueContainer">
          <p className="key">
            Value: <span>{value ?? ''}</span>
          </p>

          <button onClick={ConvertValue} className="btn" disabled={!value}>
            deCode
          </button>
        </div>
      </div>

      <div className="actionBtns">
        <button
          className="btn minus"
          onClick={DecrementHandler}
          title="decrement"
        >
          -
        </button>

        <button
          className="btn plus"
          onClick={IncrementHandler}
          title="increment"
        >
          +
        </button>
        <button className="btn" onClick={ReadContractValue} title="read value">
          get value
        </button>
      </div>
    </div>
  );
}

export default App;
