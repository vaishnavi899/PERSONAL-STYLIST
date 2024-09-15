// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productDisplayName: String,
  masterCategory: String,
  subCategory: String,
  gender: String,
  baseColour: String,
  season: String,
  year: Number,
  usage: String,
  imageUrl: String,
  reviews: [String] // Array of review texts
});

module.exports = mongoose.model('Product', productSchema);
