const router = require('express').Router();
const verify = require('./privateRoute');
const reportController = require('../controllers/reports')

// Fetch all the reports of all the patients filtered by a specific status (oldest to latest)
router.get('/:status', verify, reportController.getReportsByStatus)

module.exports = router;