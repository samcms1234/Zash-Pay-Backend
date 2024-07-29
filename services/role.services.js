const { ethers } = require("ethers");
const { default: Web3 } = require("web3");
require('dotenv').config();

const { abi } = require('../utils/ABI/MasterControl.json');
const { contractAddress, ownerAddress, networkDeployedTo } = require('../utils/contracts-config.json');
const { logWithTimestamp } = require('../utils/logger');

const web3 = new Web3("http://localhost:8545");

const masterControl = new web3.eth.Contract(abi, contractAddress);

async function createRole( role ) {
    try {
        await masterControl.methods.createRole(role).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', gas: 5000000 });
        logWithTimestamp(`New Role: ${role} added`);
    } catch(error) {
        logWithTimestamp(`Error: ${error.message}`);
    }
}

async function assignRole( role, member ) {
    try {
        await masterControl.methods.assignRole( role, member ).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', gas: 5000000 });
        logWithTimestamp(`Role assigned to address ${member} with role: ${role}`);
    } catch(error) {
        logWithTimestamp(`Error: ${error.message}`);
    }
}

async function removeRole( role, member ) {
    try {
        await masterControl.methods.removeRole( role, member ).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', gas: 5000000 });
        logWithTimestamp(`${role} role assigned address ${member} removed`);
    } catch(error) {
        logWithTimestamp(`Error: ${error.message}`);
    }
}

module.exports = {
    createRole,
    assignRole,
    removeRole
}