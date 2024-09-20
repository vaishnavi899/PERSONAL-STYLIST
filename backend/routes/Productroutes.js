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

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Use findById to get specific product by ID
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});// Search products by name or category
router.get('/search', async (req, res) => {
  const { name } = req.query; // Extract 'name' query parameter from the frontend

  try {
    // Ensure the 'name' query parameter is provided
    if (!name) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    // Find products where 'productDisplayName' or 'subCategory' contains the search term (case-insensitive)
    const products = await Product.find({
      $or: [
        { productDisplayName: { $regex: name, $options: 'i' } },
        { subCategory: { $regex: name, $options: 'i' } } // Optional: search in subCategory too
      ]
    }).limit(10); // Limit the results to 10

    // If no products are found, return a message
    if (products.length === 0) {
      return res.json({ message: "No products found." });
    }

    // Return the found products
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching products', error });
  }
});


module.exports = router;
