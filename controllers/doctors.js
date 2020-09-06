
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { docRegisterValidation, docLoginValidation } = require('../validation');

// Doctor Register Handle
exports.docRegisterHandle = async (req, res) => {

    // Validations
    const { error } = docRegisterValidation(req.body);
    if (error)
        return res.status(400).send({ error: error.details[0].message });

    // Checking if Doctor account exists in the database
    const docFound = await Doctor.findOne({ email: req.body.email });
    if (docFound) return res.status(400).send('Account already exists! Please log in.')

    // Hash Password
    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(req.body.password, salt);

    // Adding Doctor account to DB
    const { name, email } = req.body;
    const doctor = new Doctor({
        name,
        email,
        password: hashedPass
    });

    try {
        const doc = await doctor.save();
        res.send({ doctor_id: doctor._id });
    } catch (err) {
        res.status(400).send(err);
    }
}

// Doctor Login Handle
exports.docLoginHandle = async (req, res) => {

    // Validations
    const { error } = docLoginValidation(req.body);
    if (error)
        return res.status(400).send({ error: error.details[0].message });

    // Checking if Doctor account exists in the database
    const docFound = await Doctor.findOne({ email: req.body.email });
    if (!docFound) return res.status(400).send('Account not found! Please register.')

    // Checking Password Correctness
    const validPass = await bcryptjs.compare(req.body.password, docFound.password);
    if (!validPass) return res.status(400).send('Incorrect Password')

    // Alloting a JWT
    const token = jwt.sign({ _id: docFound._id }, process.env.SECRET_TOKEN_KEY, { expiresIn: '1h' })
    res.header('authToken', token).send({
        authToken: token,
        message: 'Logged in successfully!'
    });
}