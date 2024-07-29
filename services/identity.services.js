const { ethers } = require("ethers");
const { default: Web3 } = require("web3");
require('dotenv').config();

const { abi } = require('../utils/ABI/MasterControl.json');
const { contractAddress, ownerAddress, networkDeployedTo } = require('../utils/contracts-config.json');
const { logWithTimestamp } = require('../utils/logger');

const web3 = new Web3("http://localhost:8545");

const masterControl = new web3.eth.Contract(abi, contractAddress);

async function addIdentity( userAddress, name, governmentId, aadhaarNumber ) {
    try {
        await masterControl.methods.addIdentity(userAddress, name, governmentId, aadhaarNumber).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', gas: 5000000 });
        logWithTimestamp(`Identity with address: ${userAddress} added`);
    } catch(error) {
        logWithTimestamp(`Error: ${error.message}`);
    }
}

async function updateIdentity( userAddress, name, governmentId, aadhaarNumber) {
    try {
        await masterControl.methods.updateIdentity(userAddress, name, governmentId, aadhaarNumber).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', gas: 5000000 });
        logWithTimestamp(`Identity updated address ${userAddress} with details name: ${name} aadhar Number: ${aadhaarNumber}`);
    } catch(error) {
        logWithTimestamp(`Error: ${error.message}`);
    }
}

async function verifyAadhaar( userAddress, aadhaarNumber) {
    try {
        const isVerified = await masterControl.methods.verifyAadhaar(userAddress, aadhaarNumber).call();
        logWithTimestamp(`Identity with address: ${userAddress} ${isVerified ? 'Verified' : 'no verified'}`);
        return isVerified;
    } catch(error) {
        logWithTimestamp(`Error: ${error.message}`);
    }
}

module.exports = {
    addIdentity,
    updateIdentity,
    verifyAadhaar
}