const { spawn } = require('child_process');
const multer = require('multer');
const express = require('express');
const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Use multer to handle file uploads
const upload = multer({ dest: uploadsDir });

// Cosine Similarity function
function cosineSimilarity(vec1, vec2) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    normA += Math.pow(vec1[i], 2);
    normB += Math.pow(vec2[i], 2);
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    return 0; // To handle divide-by-zero error
  } else {
    return dotProduct / (normA * normB);
  }
}

// Helper function to extract features using the Python script
function extractFeatures(imagePath) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', [path.join(__dirname, 'feature_extraction.py'), imagePath]);

    let dataStr = '';
    pythonProcess.stdout.on('data', (data) => {
      dataStr += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Error:', data.toString());
    });

    pythonProcess.on('close', () => {
      try {
        const result = JSON.parse(dataStr);
        if (result && result.features) {
          resolve(result.features);
        } else {
          reject(new Error('Invalid feature extraction response'));
        }
      } catch (error) {
        reject(error);
      }
    });

    pythonProcess.on('error', (err) => {
      reject(err);
    });
  });
}

// Route for processing the uploaded image and suggesting similar products
router.post('/process-image', upload.single('image'), async (req, res) => {
  const imagePath = req.file.path;

  try {
    // Extract features from the uploaded image
    const extractedFeatures = await extractFeatures(imagePath);

    // Retrieve all products from MongoDB
    const products = await Product.find();
    
    // Array to store similarity data
    let similarities = [];

    // Process each product and compute its similarity
    for (const product of products) {
      const productImagePath = path.join(__dirname, 'path/to/product/images', product.imageUrl);
      
      try {
        const productFeatures = await extractFeatures(productImagePath);
        const similarity = cosineSimilarity(extractedFeatures, productFeatures);
        similarities.push({ product, similarity });
      } catch (err) {
        console.error(`Error processing product ${product._id}:`, err);
      }
    }

    // Sort the products by similarity and return the top 5
    similarities.sort((a, b) => b.similarity - a.similarity);
    const topProducts = similarities.slice(0, 5).map(item => item.product);

    res.json(topProducts);
  } catch (err) {
    console.error('Error processing image:', err);
    res.status(500).json({ message: 'Error extracting features or processing products' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
<<<<<<< HEAD

=======
>>>>>>> 626554a36b0be62d3ec54273215117e3c516fa1b
// Search products by name or category
router.get('/search', async (req, res) => {
  const { name } = req.query;

<<<<<<< HEAD
  try {
    if (!name) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const products = await Product.find({
      $or: [
        { productDisplayName: { $regex: name, $options: 'i' } },
        { subCategory: { $regex: name, $options: 'i' } }
=======
  if (!name) {
    return res.status(400).json({ message: 'Search term is required' });
  }

  try {
    // Find products where 'productDisplayName' or 'subCategory' contains the search term (case-insensitive)
    const products = await Product.find({
      $or: [
        { productDisplayName: { $regex: name, $options: 'i' } },
        { masterCategory: { $regex: name, $options: 'i' } },
        { subCategory: { $regex: name, $options: 'i' } },
        { articleType: { $regex: name, $options: 'i' } }
>>>>>>> 626554a36b0be62d3ec54273215117e3c516fa1b
      ]
    }).limit(10);

    if (products.length === 0) {
      return res.json({ message: 'No products found' });
    }

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
<<<<<<< HEAD
    res.status(500).json({ message: 'Error fetching products', error });
=======
    res.status(500).json({ message: 'Error fetching products', error: error.message });
>>>>>>> 626554a36b0be62d3ec54273215117e3c516fa1b
  }
});

module.exports = router;





