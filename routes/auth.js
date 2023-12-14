const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Create a new user
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: { username, password },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Set up user session or generate a JWT token for authentication

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User logout
router.post('/logout', (req, res) => {
  // Implement user logout logic (e.g., clearing session or token)
  res.json({ message: 'Logout successful' });
});

module.exports = router;
