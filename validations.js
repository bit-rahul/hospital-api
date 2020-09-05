// Validator
const Joi = require('joi');

// Doctor Registration Validation
const docRegisterValidation = (data) => {
    const doctorValidSchema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });

    // Validations
    return doctorValidSchema.validate(data);
}

const docLoginValidation = (data) => {
    const doctorValidSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });

    // Validations
    return doctorValidSchema.validate(data);
}

module.exports.docRegisterValidation = docRegisterValidation;
module.exports.docLoginValidation = docLoginValidation;