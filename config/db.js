const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from .env file

// MongoDB URI (use the local MongoDB or MongoDB Atlas URI)
const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/volunteer_donation';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if the DB connection fails
  }
};

module.exports = connectDB;
