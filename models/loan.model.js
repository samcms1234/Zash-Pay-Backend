const Joi = require('joi');

const loanSchema = Joi.object({
    borrower: Joi.string().length(42).required(),
    amount: Joi.number().positive().required(),
    interestRate: Joi.number().min(0).max(10).required(),
    duration: Joi.number().min(6).positive().integer().required(),
})

module.exports = loanSchema;
