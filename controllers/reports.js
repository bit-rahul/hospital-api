
const Report = require('../models/Report');
const { reportFilterValidation } = require('../validation');

// Fetch all the reports of all the patients filtered by a specific status (oldest to latest)
exports.getReportsByStatus = (req, res) => {
    const status = req.params.status;

    // Validations
    const { error } = reportFilterValidation({ status });
    if (error)
        return res.status(400).send({ error: error.details[0].message });

    // Finding all reports by patient ID
    Report.find({ status }, null, { sort: { date: 1 } }, function (err, docs) {
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