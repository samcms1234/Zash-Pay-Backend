const express = require('express');

const loanRouter = express.Router();

const loanSchema = require('../models/loan.model');
const { logWithTimestamp } = require('../utils/logger');

const { fetchLoan, createLoan, updateLoan, closeLoan } = require('../services/loan.services');

loanRouter.post('/', async ( req, res ) => {
    try {
        const { borrower, amount, interestRate, duration } = req.body;
        loanSchema.validate(req.body);
        
        await createLoan(borrower, amount, interestRate, duration);
        res.status(201).send(`User with address; ${borrower}`);
        logWithTimestamp(`User with address: ${borrower}`);
    } catch(error) {
        logWithTimestamp(`${error.message}`);
        res.status(500).send(`Loan cannot be created`);
    }
})

loanRouter.get('/:borrower', async (req, res) => {
    try {
        const borrower = req.params.borrower;
        const loan = await fetchLoan(borrower);
        console.log(loan);

        if(!loan) res.status(201).send(`Borrower does not exist`);
        res.json({
            amount: loan.amount.toString(),
            interestRate: loan.interestRate.toString(),
            duration: loan.duration.toString(),
            balance: loan.balance.toString(),
            startTime: loan.startTime.toString()
        });
    }
    catch(error) {
        logWithTimestamp(`${error.message}`);
        res.status(500).send(`Error fetching the loan`);
    }
});

loanRouter.patch('/', async ( req, res ) => {
    try {
        const { borrower, amount, interestRate, duration } = req.body;
        loanSchema.validate(req.body);
        
        await updateLoan(borrower, amount, interestRate, duration);
        res.status(201).send(`User with address; ${borrower} updated`);
        logWithTimestamp(`User with address; ${borrower} Updated`);
    } catch(error) {
        logWithTimestamp(`${error.message}`);
        res.status(500).send(`User with address: not found`);
    }
})

loanRouter.delete('/:borrower', async ( req, res ) => {
    try {
        const borrower = req.params.borrower;
        await closeLoan(borrower);
        logWithTimestamp(`User with address; ${borrower} Closed`);
        res.status(201).send(`User with address; ${borrower} closed`);
    } catch(error) {
        logWithTimestamp(`${error.message}`);
        res.status(500).send(`User with address: not found`);
    }
})

module.exports = loanRouter