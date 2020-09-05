const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Import Routes
const authRoute = require('./routes/doctors');
const postRoute = require('./routes/posts');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB2, { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Successfully connected to DB!")
);

// Middlewares
app.use(express.json());

// Route Middlewares 
app.use('/doctors', authRoute);
app.use('/check', postRoute);


app.listen(3000, () => console.log('Server up and running'));