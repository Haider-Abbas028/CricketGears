const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

// Env variables load karta hai
dotenv.config();

// Database se connect karta hai
connectDB();

const app = express();

// Body parsing aur CORS middleware
app.use(cors());
app.use(express.json());

// Auth routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/ProductRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Simple user check route
app.get('/api/check-users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api', (req, res) => {
  res.json({ message: 'Cricket Gears API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});