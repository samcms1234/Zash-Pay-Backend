const express = require('express');

const loanRouter = express.Router();

const loanSchema = require('../models/loan.model');
const { logWithTimestamp } = require('../utils/logger');

const { createLoan, updateLoan, closeLoan } = require('../services/loan.services');

loanRouter.post('/', async ( req, res ) => {
    try {
        const { borrower, amount, interestRate, duration } = req.body;
        loanSchema.validate(req.body);
        
        await createLoan(borrower, amount, interestRate, duration);
        res.status(201).send(`User with address; ${borrower}`);
        logWithTimestamp(`User with address; ${borrower}`);
    } catch(error) {
        logWithTimestamp(`${error.message}`);
        res.status(500).send(`User with address: not found`);
    }
})

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
        res.status(201).send(`User with address; ${borrower} closed`);
        logWithTimestamp(`User with address; ${borrower} Closed`);
    } catch(error) {
        logWithTimestamp(`${error.message}`);
        res.status(500).send(`User with address: not found`);
    }
})

module.exports = loanRouter