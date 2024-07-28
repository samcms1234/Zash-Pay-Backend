const express = require('express');
const UserList = require('../models/user.models');

const userRouter = express.Router();
const { connectMongoDb } = require('../connection');

const bcrypt = require('bcryptjs');

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

connectMongoDb(MONGODB_URI).then(() => console.log("MongoDB connect"));

userRouter.post('/register', async (req, res) => {
    const { username, firstName, lastName, email, country, aadharNumber, walletAddress, password, role } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const newUser = new UserList({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            country: country,
            aadharNumber: aadharNumber,
            walletAddress: walletAddress,
            password: hashedPassword,
            role: role
        })

        await newUser.save();
        res.status(201).send(`The user ${newUser.username} added`);
    } catch(error) {
        console.log(error.message);
        res.status(500).send(`The user not added`);
    }
});

userRouter.get('/:id', async (req, res) => {

    try {
        const user = await UserList.findById(req.params.id);
        if(!user) return res.status(404).send('User not found');
        res.status(200).json(user);
    } catch(error) {
        console.log(error);
        res.status(500).send("Error: error fetching details");
    }
})

userRouter.patch('/:id', async (req, res) => {
    
    try {
        const updates = req.body;
        const user = await UserList.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });

        if(!user) res.send(`User not found`);
        res.send(`User ${user.name} Updated`);
    } catch(error) {
        res.json({error: "Error fetching and updating details"});
    }
})

module.exports = userRouter;