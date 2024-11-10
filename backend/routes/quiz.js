const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust the path to your Product model

// Initial quiz data
const questions = [
  {
    question: "Are you shopping for Men or Women?",
    options: ["Men", "Women"]
  },
  {
    question: "What type of product are you looking for?",
    options: ["Footwear", "Apparel", "Accessories", "Watches", "Jewellery", "Bags"]
  },
  {
    question: "What base color do you prefer?",
    options: ["Black", "Red", "Grey", "Gold", "White", "Blue", "Green"]
  },
  {
    question: "What's the occasion or usage?",
    options: ["Casual", "Sports"] // Restricted for some categories later
  }
];

// Route to start the quiz
router.post('/start', async (req, res) => {
  try {
    res.json({
      message: "Welcome to the Stylist Quiz!",
      questions: questions,
      currentQuestionIndex: 0,
      selections: [],
      options: questions[0].options
    });
  } catch (error) {
    res.status(500).json({ message: 'Error starting quiz', error });
  }
});

// Route to continue the quiz or handle selections and back functionality
router.post('/continue', async (req, res) => {
  let { answer, currentQuestionIndex, selections, action } = req.body;

  if (currentQuestionIndex === null || selections === null) {
    return res.status(400).json({ message: 'Invalid quiz state' });
  }

  try {
    // Handle back action (go back to the previous question)
    if (action === "back" && currentQuestionIndex > 0) {
      selections.pop();  // Remove the last selection
      return res.json({
        message: questions[currentQuestionIndex - 1].question,
        currentQuestionIndex: currentQuestionIndex - 1,
        selections,
        options: questions[currentQuestionIndex - 1].options
      });
    }

    // Track user's selection
    selections.push(answer);

    // Fetch products based on current selections
    const [gender, type, color, usage] = selections;

    let filter = { gender: selections[0] }; // Base filter by gender

    // Directly handle product fetching for Watches, Jewellery, and Bags
    if (["Watches", "Jewellery", "Bags"].includes(type)) {
      filter.subCategory = type; // Filter directly by sub-category
      const products = await Product.find(filter).limit(15);

      return res.json({
        message: "Quiz Complete: View the final recommendations below.",
        currentQuestionIndex: currentQuestionIndex + 1,
        selections,
        products: products.length > 0 ? products : [],
        quizComplete: true, // Indicate quiz completion
      });
    } else {
      // For other categories, apply additional filters
      if (currentQuestionIndex >= 1) filter.masterCategory = type; // Filter by type if available
      if (currentQuestionIndex >= 2) filter.baseColour = color; // Filter by color if available
      if (currentQuestionIndex >= 3) filter.usage = usage; // Filter by usage if available
    }

<<<<<<< HEAD
    
    const [type, color, usage] = selections;

    
    const products = await Product.find({
      masterCategory: type,
      baseColour: color,
      usage: usage
    }).limit(15);
=======
    // Continue to fetch products if the quiz is not completed yet
    const products = await Product.find(filter).limit(15);

    const responsePayload = {
      message: currentQuestionIndex + 1 < questions.length 
        ? questions[currentQuestionIndex + 1].question 
        : "Quiz Complete: View the final recommendations below.",
      currentQuestionIndex: currentQuestionIndex + 1,
      selections,
      options: questions[currentQuestionIndex + 1]?.options || [],
      products: products.length > 0 ? products : [],
      showProducts: true,
      allowContinue: currentQuestionIndex + 1 < questions.length // Only allow continuing if there are more questions
    };
>>>>>>> 626554a36b0be62d3ec54273215117e3c516fa1b

    // If user has reached the final question
    if (currentQuestionIndex + 1 >= questions.length) {
      responsePayload.quizComplete = true;
    }

    res.json(responsePayload);
  } catch (error) {
    res.status(500).json({ message: 'Error processing quiz', error });
  }
});

module.exports = router;
