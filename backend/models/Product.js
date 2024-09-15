// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: String,
  gender: String,
  masterCategory: String,
  subCategory: String,
  articleType: String,
  baseColour: String,
  season: String,
  year: Number,
  usage: String,
  productDisplayName: String,
  imageUrl: String, // URL from Cloudinary
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
