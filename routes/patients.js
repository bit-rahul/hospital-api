const router = require('express').Router();
const verify = require('./privateRoute');
const patientController = require('../controllers/patients')

// Patient Register Handle
router.post('/register', verify, patientController.patientRegisterHandle)

// Creating a Patient Report Handle
router.post('/:id/create_report', verify, patientController.patientRegisterReport)

// Fetch all the reports of a patient oldest to latest
router.get('/:id/all_reports', verify, patientController.patientGetReports)

module.exports = router;