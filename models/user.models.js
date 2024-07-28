const mongoose = require('mongoose');
const integerValidator = require('../Validators/integerValidator');
const walletAddressValidator = require('../Validators/walletAddressValidator');
const emailValidator = require('../Validators/emailValidator');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    about: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, validate: emailValidator},
    country: { type: String, required: true },
    address: { type: String },
    state: { type: String },
    city: { type: String },
    pinCode: { type: String, validate: integerValidator},
    aadharNumber: { type: String, required: true, unique: true, validate: integerValidator },
    walletAddress: { type: String, required: true, unique: true, validate: walletAddressValidator },
    date: { type: Date, default: Date.now},
    password: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }

});

module.exports = mongoose.model('UserList', userSchema);