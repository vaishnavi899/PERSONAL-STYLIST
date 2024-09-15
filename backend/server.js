const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import the CORS middleware
const productRoutes = require('./routes/Productroutes');
const path = require('path');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

// Middleware
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'data/images')));
// Routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
