const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login (Simple check for now, typically involves JWT)
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ EmailAddress: req.body.EmailAddress });
    if (!user) return res.status(404).json("User not found");
    
    // In production, compare hashed passwords!
    if (user.Password !== req.body.Password) {
        return res.status(400).json("Wrong password");
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
