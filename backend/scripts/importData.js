// scripts/importData.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const Product = require('../models/Product');
const uploadImageToCloudinary = require('../utils/uploadImage'); // Updated import
const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config();

const imageFolderPath = path.join(__dirname, '..', 'data', 'images'); // Path to your local image folder
const csvFilePath = path.join(__dirname, '..', 'data', 'styles.csv'); // Path to CSV file

const importData = async () => {
  const products = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      const imagePath = path.join(imageFolderPath, `${row.id}.jpg`);

      // Check if image exists
      if (fs.existsSync(imagePath)) {
        try {
          const imageUrl = await uploadImageToCloudinary(imagePath); // Upload to Cloudinary

          // Create product document
          const product = {
            productId: row.id,
            gender: row.gender,
            masterCategory: row.masterCategory,
            subCategory: row.subCategory,
            articleType: row.articleType,
            baseColour: row.baseColour,
            season: row.season,
            year: row.year,
            usage: row.usage,
            productDisplayName: row.productDisplayName,
            imageUrl: imageUrl, // Use Cloudinary URL
          };

          products.push(product);
        } catch (error) {
          console.error(`Error uploading image for product ${row.id}:`, error);
        }
      }
    })
    .on('end', async () => {
      try {
        // Insert into MongoDB
        await Product.insertMany(products);
        console.log('Data Imported');
      } catch (error) {
        console.error('Error importing data:', error);
      } finally {
        mongoose.disconnect(); // Disconnect from MongoDB
        process.exit();
      }
    });
};

importData();
