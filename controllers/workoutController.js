const Workout = require('../models/Workout');

exports.createWorkout = async (req, res) => {
  try {
    const { name, duration, status } = req.body;

    if (!name || !duration) {
      return res.status(400).json({ msg: 'Please include a name and duration for the workout.' });
    }

    const newWorkout = new Workout({
      user: req.user.id,
      name,
      duration,
      status
    });

    const workout = await newWorkout.save();
    res.status(201).json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ dateAdded: -1 });
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id })
                                  .sort({ dateAdded: -1 });
    res.json({
      success: true,
      count: workouts.length,
      data: workouts
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, msg: 'Server Error' });
  }
};

exports.getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({ msg: 'Workout not found' });
        }

        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        res.json(workout);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Workout not found' });
        }
        res.status(500).send('Server Error');
    }
};

exports.updateWorkout = async (req, res) => {
    const { id, name, duration, status } = req.body;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        msg: 'Please provide the workout ID' 
      });
    }

    const workoutFields = {};
    if (name) workoutFields.name = name;
    if (duration) workoutFields.duration = duration;
    if (status) workoutFields.status = status;

    try {
        let workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ 
              success: false,
              msg: 'Workout not found' 
            });
        }

        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ 
              success: false,
              msg: 'User not authorized' 
            });
        }

        workout = await Workout.findByIdAndUpdate(
            id,
            { $set: workoutFields },
            { new: true }
        );

        res.json({
          success: true,
          data: workout
        });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ 
              success: false,
              msg: 'Workout not found' 
            });
        }
        res.status(500).json({
          success: false,
          msg: 'Server Error'
        });
    }
};

exports.deleteWorkout = async (req, res) => {
    try {
        const { id } = req.body;
        
        if (!id) {
          return res.status(400).json({ 
            success: false, 
            msg: 'Please provide the workout ID' 
          });
        }
        
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ 
              success: false, 
              msg: 'Workout not found' 
            });
        }

        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ 
              success: false, 
              msg: 'User not authorized' 
            });
        }

        await Workout.findByIdAndDelete(id);

        res.json({ 
          success: true, 
          msg: 'Workout removed' 
        });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ 
              success: false, 
              msg: 'Workout not found' 
            });
        }
        res.status(500).json({ 
          success: false, 
          msg: 'Server Error' 
        });
    }
};

exports.completeWorkoutStatus = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ 
        success: false, 
        msg: 'Please provide the workout ID' 
      });
    }

    let workout = await Workout.findById(id);
    
    if (!workout) {
      return res.status(404).json({ 
        success: false, 
        msg: 'Workout not found' 
      });
    }

    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({ 
        success: false, 
        msg: 'User not authorized' 
      });
    }

    workout = await Workout.findByIdAndUpdate(
      id,
      { $set: { status: 'completed' } },
      { new: true }
    );

    res.json({
      success: true,
      data: workout
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        msg: 'Workout not found' 
      });
    }
    res.status(500).json({ 
      success: false, 
      msg: 'Server Error' 
    });
  }
};
