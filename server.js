const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

dotenv.config();  

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());  
app.use(cors());          

connectDB();


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);  

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);  

const donationRoutes = require('./routes/donationRoutes');
app.use('/api/donations', donationRoutes);  

const skillRoutes = require('./routes/skillRoutes');
app.use('/api/skills', skillRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
