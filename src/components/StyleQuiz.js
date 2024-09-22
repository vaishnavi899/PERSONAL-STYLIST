import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/StyleQuiz.css';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selections, setSelections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [questionText, setQuestionText] = useState("Start the Stylist Quiz!");
  const [options, setOptions] = useState([]);
  const [allowContinue, setAllowContinue] = useState(false);

  useEffect(() => {
    const initializeQuiz = async () => {
      try {
        const response = await axios.post('/api/quiz/start');
        setQuestions(response.data.questions);
        setCurrentQuestionIndex(response.data.currentQuestionIndex);
        setSelections(response.data.selections || []);
        setQuestionText(response.data.message);
        setOptions(response.data.options || []);
      } catch (error) {
        console.error('Error initializing quiz:', error);
      }
    };

    initializeQuiz();
  }, []);

  const submitAnswer = async (answer) => {
    try {
      const response = await axios.post('/api/quiz/continue', {
        answer,
        currentQuestionIndex,
        selections
      });

      if (response.data.products) {
        setProducts(response.data.products);
      }

      if (response.data.quizComplete) {
        setQuizComplete(true);
      } else {
        setCurrentQuestionIndex(response.data.currentQuestionIndex);
        setSelections(response.data.selections);
        setQuestionText(response.data.message);
        setOptions(response.data.options || []);
        setAllowContinue(response.data.allowContinue);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div className="quiz-container">
      {quizComplete ? (
        <div className="product-recommendations">
          <h3>Recommended Products</h3>
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.productId} className="product-item">
                <img src={product.imageUrl} alt={product.productDisplayName} className="product-image" />
                <p>{product.productDisplayName}</p>
              </li>
            ))}
          </ul>
          <button onClick={() => window.location.reload()}>Retake Quiz</button>
        </div>
      ) : (
        <div className="quiz">
          <h2>{questionText}</h2>
          <ul className="options-list">
            {options.map((option, index) => (
              <li key={index}>
                <button className="option-button" onClick={() => submitAnswer(option)}>{option}</button>
              </li>
            ))}
          </ul>
          <div className="product-recommendations">
            <h3>Current Recommendations</h3>
            <ul className="product-list">
              {products.map((product) => (
                <li key={product.productId} className="product-item">
                  <img src={product.imageUrl} alt={product.productDisplayName} className="product-image" />
                  <p>{product.productDisplayName}</p>
                </li>
              ))}
            </ul>
          </div>
          {allowContinue && (
            <button className="continue-button" onClick={() => submitAnswer(null)}>Continue Quiz</button>
          )}
        </div>
      )}
    </div>
  );
  
};

export default Quiz;
