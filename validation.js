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

// Doctor Login Validation
const docLoginValidation = (data) => {
    const doctorValidSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()
    });

    // Validations
    return doctorValidSchema.validate(data);
}

// Patient Registration Validation
const patientRegisterValidation = (data) => {
    const patientValidSchema = Joi.object({
        name: Joi.string().min(4).required(),
        age: Joi.number().required(),
        sex: Joi.string().valid('M', 'F').required(),
        mobile: Joi.string().regex(/^[0-9]{10}$/)
    });

    // Validations
    return patientValidSchema.validate(data);
}

// Report Generation Validation
const reportGenerateValidation = (data) => {
    const reportValidSchema = Joi.object({
        status: Joi.string().valid('Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit').required(),
        date: Joi.date()
    });

    // Validations
    return reportValidSchema.validate(data);
}

// Report Filter Validation
const reportFilterValidation = (data) => {
    const reportFilterValidSchema = Joi.object({
        status: Joi.string().valid('Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit').required(),
    });

    // Validations
    return reportFilterValidSchema.validate(data);
}


module.exports.docRegisterValidation = docRegisterValidation;
module.exports.docLoginValidation = docLoginValidation;
module.exports.patientRegisterValidation = patientRegisterValidation;
module.exports.reportGenerateValidation = reportGenerateValidation;
module.exports.reportFilterValidation = reportFilterValidation;