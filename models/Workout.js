const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['completed', 'planned', 'skipped'],
    default: 'completed'
  }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
