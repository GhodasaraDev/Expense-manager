const express = require('express');
const router = express.Router();
const People = require('../models/People');

// Create
router.post('/', async (req, res) => {
  const newPeople = new People(req.body);
  try {
    const savedPeople = await newPeople.save();
    res.status(200).json(savedPeople);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All
router.get('/', async (req, res) => {
  try {
    const peoples = await People.find();
    res.status(200).json(peoples);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get One
router.get('/:id', async (req, res) => {
  try {
    const people = await People.findById(req.params.id);
    res.status(200).json(people);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedPeople = await People.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPeople);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await People.findByIdAndDelete(req.params.id);
    res.status(200).json("People has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
