const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load env vars - specify the path to ensure it's found
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      console.error('MongoDB URI is not defined. Check your .env file configuration.');
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
