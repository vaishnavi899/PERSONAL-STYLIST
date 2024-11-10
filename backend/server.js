process.env.TF_ENABLE_ONEDNN_OPTS = '0'; // Suppress oneDNN optimization warnings

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/Productroutes');
const quizRouter = require('./routes/quiz');
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
<<<<<<< HEAD

app.use('/api/quiz',quizRouter);
=======
app.use('/api/quiz', quizRouter);

>>>>>>> 626554a36b0be62d3ec54273215117e3c516fa1b
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
