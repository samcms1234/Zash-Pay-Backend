const Joi = require('joi');

const identitySchema = Joi.object({
    address: Joi.string().length(42).required(),
    name: Joi.string().required(),
    governmentId: Joi.string().length(12).required(),
    aadharNumber: Joi.string().length(12).required(),
})

module.exports = identitySchema;
