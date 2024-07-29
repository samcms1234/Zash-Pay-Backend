const express = require('express');

const identityRouter = express.Router();

const identitySchema = require('../models/identity.model');
const { logWithTimestamp } = require('../utils/logger');

const { addIdentity, updateIdentity, verifyAadhaar } = require('../services/identity.services');

identityRouter.post('/create', async (req, res) => {
    const { userAddress, name, governmentId, aadhaarNumber } = req.body;
    identitySchema.validate(req.body);
    
    try {
        await addIdentity(userAddress, name, governmentId, aadhaarNumber);
        res.status(200).send(`Identity added address ${userAddress}`);
    } catch(error) {
        logWithTimestamp(`Error: ${error.message}`);
        res.status(500).send(`Identity cannot be created`);
    }
})

identityRouter.patch('/update', async (req, res) => {
    const { userAddress, name, governmentId, aadhaarNumber } = req.body;
    identitySchema.validate(req.body);
    
    try {
        await updateIdentity(userAddress, name, governmentId, aadhaarNumber);
        res.status(200).send(`Identity updated address ${userAddress} with details name: ${name} aadhar Number: ${aadhaarNumber}`);
    } catch(error) {
        logWithTimestamp(`Error: ${error.message}`);
        res.status(500).send(`Identity cannot be updated`);
    }
})

identityRouter.get('/verify', async (req, res) => {
    const { userAddress, aadhaarNumber } = req.body;

    try {
        const isVerified = await verifyAadhaar(userAddress, aadhaarNumber);
        
        if (isVerified === undefined) {
            return res.status(204).send(`Identity does not exist`);
        }

        if (!isVerified) {
            return res.status(204).send(`Identity is not verified`);
        }

        res.status(200).send(`The Identity is verified`);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

module.exports = identityRouter

