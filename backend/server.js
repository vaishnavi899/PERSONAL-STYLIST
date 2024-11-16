const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/Productroutes');
const quizRouter = require('./routes/quiz');
const outfitRoutes = require('./routes/outfitRoutes');  // Import the new outfit routes
const path = require('path');
const data = require('./data.json');  // Import the local dataset
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
app.use('/api', outfitRoutes);  // Add outfit suggestion routes

// Chatbot Route
app.post('/api/chatbot', (req, res) => {
  const userInput = req.body.userInput;
  const chatbotResponse = getResponse(userInput);
  res.json({ chatbotResponse });
});

// Function to get response from the dataset
function getResponse(input) {
  const lowerCaseInput = input.toLowerCase();
  const response = data.find((item) => item.question.toLowerCase() === lowerCaseInput);
  return response ? response.answer : 'Sorry, I didn\'t understand that.';
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));