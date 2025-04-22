const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();  // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());  // To parse JSON request bodies
app.use(cors());          // To allow cross-origin requests

// Connect to MongoDB
connectDB();

// Register Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);  // Register auth routes

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);  // Register task routes

const donationRoutes = require('./routes/donationRoutes');
app.use('/api/donations', donationRoutes);  // Register donation routes


// Sample Route
app.get('/', (req, res) => {
  res.send('API is running...');
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
