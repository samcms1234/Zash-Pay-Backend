const { ethers } = require("ethers");
const { default: Web3 } = require("web3");
require('dotenv').config();

const { abi } = require('../utils/ABI/MasterControl.json');
const { contractAddress, ownerAddress, networkDeployedTo } = require('../utils/contracts-config.json');
const { logWithTimestamp } = require('../utils/logger');

const web3 = new Web3("http://localhost:8545");

const masterControl = new web3.eth.Contract(abi, contractAddress);

module.exports = {
    masterControl,
    contractAddress, 
    ownerAddress, 
    networkDeployedTo
}
