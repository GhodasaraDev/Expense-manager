const express = require('express');
const router = express.Router();
const Income = require('../models/Income');

// Create
router.post('/', async (req, res) => {
  const newIncome = new Income(req.body);
  try {
    const savedIncome = await newIncome.save();
    res.status(200).json(savedIncome);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All
router.get('/', async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get One
router.get('/:id', async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedIncome);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json("Income has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
