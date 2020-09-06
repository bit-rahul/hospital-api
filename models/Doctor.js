const mongoose = require('mongoose');

// Doctor Schema
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);