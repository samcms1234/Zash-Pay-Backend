const express = require('express');
const User = require('../models/user.models');

const userRouter = express.Router();
const { connectMongoDb } = require('../connection');

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

connectMongoDb(MONGODB_URI).then(() => console.log("MongoDB connect"));

userRouter.post('/', async (req, res) => {
    const { name, email, date, walletAddress } = req.body;
    try {
        const newUser = new User({
            name: name,
            email: email,
            date: date,
            walletAddress: walletAddress
        })

        await newUser.save();
        res.status(201).send(`The user ${newUser.name} added`);
    } catch(error) {
        res.status(500).send(`The user not added`);
    }
});

userRouter.get('/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).send('User not found');
        res.status(200).json(`User ${user.name} found`);
    } catch(error) {
        console.log(error);
        res.status(500).send("Error: error fetching details");
    }
})

userRouter.patch('/:id', async (req, res) => {
    
    try {
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

        if(!user) res.send(`User not found`);
        res.send(`User ${user.name} Updated`);
    } catch(error) {
        res.json({error: "Error fetching and updating details"});
    }
})

module.exports = userRouter;