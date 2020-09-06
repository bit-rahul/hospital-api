const jwt = require('jsonwebtoken');

// Protecting routes by authentication
module.exports = function(req, res, next) {
    const token = req.header('authToken');
    if (!token) return res.status(401).send('You are not authorized!');

    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        req.doctor = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid or Expired token');
    }
}