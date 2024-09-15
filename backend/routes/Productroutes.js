const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Use findById
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a review to a product
router.post('/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.id });
    if (product) {
      const review = req.body.review; // Expecting review text in the request body
      if (!product.reviews) {
        product.reviews = [];
      }
      product.reviews.push(review);
      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product (if needed)
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ productId: req.params.id }, req.body, { new: true });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product (if needed)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ productId: req.params.id });
    if (product) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
