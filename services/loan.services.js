const { ethers } = require("ethers");
const { default: Web3 } = require("web3");
require('dotenv').config();

const { abi } = require('../utils/ABI/MasterControl.json');
const { contractAddress, ownerAddress, networkDeployedTo } = require('../utils/contracts-config.json');

const web3 = new Web3("http://localhost:8545");

const masterControl = new web3.eth.Contract(abi, contractAddress);

function logWithTimestamp(message) {
    const timestamp = new Date().toString();
    console.log(`[${timestamp}] ${message}`);
}

async function createLoan( borrower, amount, interestRate, duration) {

    try {
        await masterControl.methods.createLoan(borrower, amount, interestRate, duration).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', gas: 5000000 });
        logWithTimestamp(`Loan Created for borrower: ${borrower}, amount: ${amount}, interestRate: ${interestRate}, duration: ${duration}`);
    } catch(error) {
        logWithTimestamp(`${error.message}`);
    }
}

async function updateLoan( borrower, amount, interestRate, duration) {

    try {
        await masterControl.methods.updateLoan(borrower, amount, interestRate, duration).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', gas: 5000000 });
        logWithTimestamp(`Loan Updated for borrower: ${borrower}, amount: ${amount}, interestRate: ${interestRate}, duration: ${duration}`);
    } catch(error) {
        logWithTimestamp(`${error.message}`);
    }
}

async function closeLoan( borrower, amount, interestRate, duration) {

    try {
        await masterControl.methods.closeLoan(borrower).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', gas: 5000000 });
        logWithTimestamp(`Loan Closed for borrower: ${borrower}`);
    } catch(error) {
        logWithTimestamp(`${error.message}`);
    }
}

module.exports = {
    createLoan,
    updateLoan,
    closeLoan
}