const express = require('express');
const router = express.Router();
const {
    createWorkout,
    getMyWorkouts,
    updateWorkout,
    deleteWorkout,
    completeWorkoutStatus
} = require('../controllers/workoutController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/addWorkout', createWorkout);

router.get('/getMyWorkouts', getMyWorkouts);

router.put('/updateWorkout', updateWorkout);

router.delete('/deleteWorkout', deleteWorkout);

router.put('/completeWorkoutStatus', completeWorkoutStatus);

module.exports = router;
