// routes/search.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import the Product model

router.get('/search', async (req, res) => {
    const { productName, category, page = 1, limit = 20 } = req.query;
    
    try {
      const query = {};
      if (productName) query.productDisplayName = new RegExp(productName, 'i');
      if (category) query.masterCategory = category;
  
      const products = await Product.find(query)
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
      
      const totalProducts = await Product.countDocuments(query);
      const totalPages = Math.ceil(totalProducts / limit);
  
      res.json({
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalProducts
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
