const express = require('express');
const bcrypt = require('bcryptjs');
const UserList = require('../models/user.models');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();

authRouter.use(express.json());

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserList.findOne({ email: email });

        if(!user) return res.status(400).send('Invalid email and password');
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).send('Inavlid email and password');

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET.toString(), { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch(error) {
        res.status(500).send(`Error logging in user ${error.message}`);
    }
})

module.exports = authRouter