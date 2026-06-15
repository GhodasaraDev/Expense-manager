const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Create
router.post('/', async (req, res) => {
  const newExpense = new Expense(req.body);
  try {
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get One
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json("Expense has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
