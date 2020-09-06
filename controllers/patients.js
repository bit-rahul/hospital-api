
const Patient = require('../models/Patient');
const Report = require('../models/Report');
const jwt = require('jsonwebtoken');
const { patientRegisterValidation, reportGenerateValidation } = require('../validation');

// Patient Register Handle
exports.patientRegisterHandle = async (req, res) => {

    // Validations
    const { error } = patientRegisterValidation(req.body);
    if (error)
        return res.status(400).send({ error: error.details[0].message });

    // Checking if Patient account exists in the database
    const patientFound = await Patient.findOne({ mobile: req.body.mobile });
    if (patientFound) return res.send(patientFound)

    // Adding Patient account to DB
    const { name, age, sex, mobile } = req.body;
    const patient = new Patient({
        name,
        age,
        sex,
        mobile
    });

    try {
        const patientN = await patient.save();
        res.send(patientN);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Creating a Patient Report Handle
exports.patientRegisterReport = async (req, res) => {

    // Validations
    const { error } = reportGenerateValidation(req.body);
    if (error)
        return res.status(400).send({ error: error.details[0].message });

    // Adding Report to DB
    const token = req.header('authToken');
    const patient_id = req.params.id;
    const verified = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    const { status, date } = req.body;
    const report = new Report({
        created_by: verified._id,
        patient_id,
        status,
        date
    });

    try {
        const reportN = await report.save();
        res.send(reportN);
    } catch (err) {
        res.status(400).send(err);
    }
}

// Fetch all the reports of a patient oldest to latest
exports.patientGetReports = (req, res) => {
    const patient_id = req.params.id;

    // Finding all reports by patient ID
    Report.find({ patient_id }, null, { sort: { date: 1 } }, function (err, docs) {
        if (err) {
            return res.status(400).send({
                error: err,
                message: "Reports not found!"
            });
        }
        else res.send({
            reports: docs,
            filteredRecords: docs.length
        })
    });
}