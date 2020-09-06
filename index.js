const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Import Routes
const docRoute = require('./routes/doctors');
const patientRoute = require('./routes/patients');
const reportRoute = require('./routes/reports')

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Successfully connected to DB!")
);

// Middlewares
app.use(express.json());

// Route Middlewares 
app.use('/doctors', docRoute);
app.use('/patients', patientRoute);
app.use('/reports', reportRoute);

app.listen(3000, () => console.log('Server up and running'));