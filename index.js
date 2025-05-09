const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('Fitness Tracker API Running'));

//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if(require.main === module){
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
    });
}

module.exports = {app,mongoose};
