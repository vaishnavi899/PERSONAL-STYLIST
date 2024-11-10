const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust the path to your Product model

// Route to start the quiz
router.post('/start', async (req, res) => {
  try {
    const questions = [
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
        options: ["Casual", "Sports", "Formal", "Party"]
      }
    ];

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

// Route to continue the quiz or handle direct selections
router.post('/continue', async (req, res) => {
  const { answer, currentQuestionIndex, selections } = req.body;

  if (currentQuestionIndex === null || selections === null) {
    return res.status(400).json({ message: 'Invalid quiz state' });
  }

  try {
    // Handle direct product category selection
    const directCategories = ["Watches", "Jewellery", "Bags"];
    if (directCategories.includes(answer)) {
      // Fetch products by `subCategory` for better specificity
      const products = await Product.find({ subCategory: answer }).limit(15);
      if (products.length === 0) {
        return res.json({ message: `No ${answer} found in our database.` });
      }
      return res.json({
        message: `Here are some ${answer} recommendations:`,
        products,
        quizComplete: true
      });
    }

    // Continue with the quiz logic
    selections.push(answer);

    const questions = [
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
        options: ["Casual", "Sports", "Formal", "Party"]
      }
    ];

    if (currentQuestionIndex + 1 < questions.length) {
      return res.json({
        message: questions[currentQuestionIndex + 1].question,
        currentQuestionIndex: currentQuestionIndex + 1,
        selections,
        options: questions[currentQuestionIndex + 1].options
      });
    }

    
    const [type, color, usage] = selections;

    
    const products = await Product.find({
      masterCategory: type,
      baseColour: color,
      usage: usage
    }).limit(15);

    if (products.length === 0) {
      return res.json({ message: "No products match your preferences." });
    }

    res.json({
      message: "Here are some product recommendations based on your preferences:",
      products,
      currentQuestionIndex: questions.length,  // Quiz is done
      selections
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing quiz', error });
  }
});

module.exports = router;
