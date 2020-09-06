const mongoose = require('mongoose');
const statuss = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']

// Report Schema
const reportSchema = new mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: statuss,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);