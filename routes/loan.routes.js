const express = require('express');

const loanRoutes = express.Router();

const { loanSchema } = require('../models/loan.model');

loanRoutes.post('/', async ( req, res ) => {
    
    try {
        const { borrower, amount, interestRate, duration } = req.body;
        loanSchema.validate(req.body);
        
        
    }
})