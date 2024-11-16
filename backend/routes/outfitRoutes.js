const express = require('express');
const Outfit = require('../models/outfitModel');
const router = express.Router();

// Route to get outfits based on occasion
router.get('/outfits', async (req, res) => {
  try {
    const { occasion, body_shape, color, size } = req.query;
    let filter = { occasion };

    // Add additional filters if provided
    if (body_shape) filter.body_shape = body_shape;
    if (color) filter.color = color;
    if (size) filter.size = size;

    const outfits = await Outfit.find(filter);
    res.json(outfits);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
