const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');

// --- Categories ---

// Create Category
router.post('/', async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get One Category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Category
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Category
router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// --- SubCategories ---

// Create SubCategory
router.post('/sub', async (req, res) => {
  const newSubCategory = new SubCategory(req.body);
  try {
    const savedSubCategory = await newSubCategory.save();
    res.status(200).json(savedSubCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All SubCategories
router.get('/sub/all', async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json(subCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get SubCategories by CategoryID
router.get('/sub/by-category/:categoryId', async (req, res) => {
  try {
    const subCategories = await SubCategory.find({ CategoryID: req.params.categoryId });
    res.status(200).json(subCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
