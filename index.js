require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('Fitness Tracker API Running'));

const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/auth');

app.use('/workouts', workoutRoutes);
app.use('/users', userRoutes);

if(require.main === module){
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${process.env.PORT || 4000}`)
    });
}

module.exports = {app, mongoose};
