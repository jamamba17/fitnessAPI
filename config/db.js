const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use environment variable if available (for Render.com), or fallback to local URL
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitnessTracker';
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
