const router = require('express').Router();

//------------ Importing Controller ------------//
const docController = require('../controllers/doctors')

// Doctor Register Handle
router.post('/register', docController.docRegisterHandle)

// Doctor Login Handle
router.post('/login', docController.docLoginHandle)

module.exports = router;