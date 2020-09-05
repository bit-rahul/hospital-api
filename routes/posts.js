const router = require('express').Router();
const verify = require('./privateRoute')

router.get('/', verify, (req, res) => {
    res.send(req.doctor);
})

module.exports = router;