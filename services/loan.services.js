const { masterControl } = require('../config/blockchain.config');
const { logWithTimestamp } = require('../utils/logger')

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

async function closeLoan( borrower ) {

    try {
        await masterControl.methods.closeLoan(borrower).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', gas: 5000000 });
        logWithTimestamp(`Loan Closed for borrower: ${borrower}`);
    } catch(error) {
        logWithTimestamp(`${error.message}`);
    }
}

async function fetchLoan(borrower) {
    try {
        const loan = await masterControl.methods.fetchLoan(borrower).call();
        logWithTimestamp(`Loan for borrower: ${borrower} has interest rate: ${loan.interestRate}`);
        return loan;
    } catch (error) {
        logWithTimestamp(`Error fetching loan for borrower ${borrower}: ${error.message}`);
        throw error;
    }
}

module.exports = {
    fetchLoan,
    createLoan,
    updateLoan,
    closeLoan
}