const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

// Admin users list laata hai
router.get('/users', protect, async (req, res) => {
  try {
    const adminUser = await User.findById(req.user.id);
    if (adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const users = await User.find({}).select('-password');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin user update karta hai
router.put('/users/:id', protect, async (req, res) => {
  try {
    const adminUser = await User.findById(req.user.id);
    if (adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { fullName, email, role, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.role = role || user.role;
    if (password) user.password = password;

    await user.save();
    res.json({ success: true, user: { _id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin user delete karta hai
router.delete('/users/:id', protect, async (req, res) => {
  try {
    const adminUser = await User.findById(req.user.id);
    if (adminUser.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Apni profile update karta hai user
router.put('/profile', protect, async (req, res) => {
  try {
    const { fullName, email, phone } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    res.json({
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Auth endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getCurrentUser);

module.exports = router;