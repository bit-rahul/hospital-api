const mongoose = require('mongoose');
const genders = ['M', 'F'];

// Patient Schema
const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        enum: genders,
        required:true
    },
    mobile: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);