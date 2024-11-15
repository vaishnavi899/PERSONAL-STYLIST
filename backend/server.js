process.env.TF_ENABLE_ONEDNN_OPTS = '0'; // Suppress oneDNN optimization warnings

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/ProductRoutes');
const quizRouter = require('./routes/quiz');
//const recommendationRouter = require('./routes/recommendationRoutes'); // Add this route
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
 app.use('/api/quiz', quizRouter);
//app.use('/api/recommendations', recommendationRouter); // Add the recommendation route

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

