const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Outfit = require('../models/outfitModel');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const outfits = [
  {
    occasion: 'college',
    category: 'topwear',
    color: 'blue',
    size: 'M',
    body_shape: 'hourglass',
    outfit_image_url: 'http://example.com/college_top.jpg',
    description: 'A casual blue top perfect for college wear.',
  },
  {
    occasion: 'formal',
    category: 'bottomwear',
    color: 'black',
    size: 'L',
    body_shape: 'rectangle',
    outfit_image_url: 'http://example.com/formal_pants.jpg',
    description: 'Black formal pants ideal for office meetings.',
  },
];

const importData = async () => {
  try {
    await Outfit.deleteMany();
    await Outfit.insertMany(outfits);
    console.log('Data Imported');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
