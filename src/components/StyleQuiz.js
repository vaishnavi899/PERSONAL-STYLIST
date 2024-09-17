import React, { useState, useEffect } from 'react';
import "./StyleQuiz.css"

const StyleQuiz = () => {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState({
    gender: '',
    masterCategory: '',
    subCategory: '',
    articleType: '',
    baseColour: '',
    season: '',
    usage: ''
  });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle radio button selection for each step
  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value
    });
  };

  // Filter products based on preferences (called at the final step)
  const filterProducts = () => {
    const filtered = products.filter(product =>
      (preferences.gender ? product.gender === preferences.gender : true) &&
      (preferences.masterCategory ? product.masterCategory === preferences.masterCategory : true) &&
      (preferences.subCategory ? product.subCategory === preferences.subCategory : true) &&
      (preferences.articleType ? product.articleType === preferences.articleType : true) &&
      (preferences.baseColour ? product.baseColour === preferences.baseColour : true) &&
      (preferences.season ? product.season === preferences.season : true) &&
      (preferences.usage ? product.usage === preferences.usage : true)
    );

    setFilteredProducts(filtered);
  };

  // Define the questions
  const questions = [
    {
      question: "Hello! May I ask, who are we styling today?",
      name: "gender",
      options: [
        { value: "Men", label: "A gentleman" },
        { value: "Women", label: "A lady" }
      ]
    },
    {
      question: "Great! What category are you looking for?",
      name: "masterCategory",
      options: [
        { value: "Apparel", label: "Apparel" },
        { value: "Accessories", label: "Accessories" }
      ]
    },
    {
      question: "What type of items are you shopping for?",
      name: "subCategory",
      options: [
        { value: "Topwear", label: "Topwear" },
        { value: "Bottomwear", label: "Bottomwear" },
        { value: "Watches", label: "Watches" }
      ]
    },
    {
      question: "Can you be more specific? What kind of article are you interested in?",
      name: "articleType",
      options: [
        { value: "Shirts", label: "Shirts" },
        { value: "Tshirts", label: "T-shirts" },
        { value: "Jeans", label: "Jeans" },
        { value: "Track Pants", label: "Track Pants" },
        { value: "Watches", label: "Watches" }
      ]
    },
    {
      question: "Which base colour do you prefer?",
      name: "baseColour",
      options: [
        { value: "Black", label: "Black" },
        { value: "Grey", label: "Grey" },
        { value: "Blue", label: "Blue" },
        { value: "Green", label: "Green" },
        { value: "Navy Blue", label: "Navy Blue" },
        { value: "Silver", label: "Silver" }
      ]
    },
    {
      question: "Which season are we dressing for?",
      name: "season",
      options: [
        { value: "Summer", label: "Summer" },
        { value: "Winter", label: "Winter" },
        { value: "Fall", label: "Fall" },
        { value: "Spring", label: "Spring" }
      ]
    },
    {
      question: "How do you plan on using these clothes?",
      name: "usage",
      options: [
        { value: "Casual", label: "Casual" },
        { value: "Party", label: "Party" },
        { value: "Ethnic", label: "Ethnic" }
      ]
    }
  ];

  // Move to the next step
  const nextStep = () => {
    if (step === questions.length - 1) {
      filterProducts(); // Call filter products at the last step
    }
    setStep((prev) => prev + 1);
  };

  // Move to the previous step (optional)
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div>
      {step < questions.length ? (
        <div>
          <h2>Style Quiz</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>{questions[step].question}</h3>
            {questions[step].options.map((option) => (
              <div key={option.value}>
                <label>
                  <input
                    type="radio"
                    name={questions[step].name}
                    value={option.value}
                    checked={preferences[questions[step].name] === option.value}
                    onChange={handleChange}
                  />
                  {option.label}
                </label>
              </div>
            ))}

            <div>
              {step > 0 && <button type="button" onClick={prevStep}>Previous</button>}
              <button type="button" onClick={nextStep} disabled={!preferences[questions[step].name]}>
                {step === questions.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h3>Recommended Products:</h3>
          {filteredProducts.length > 0 ? (
            <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
              {filteredProducts.map((product) => (
                <li key={product.id} style={{ listStyle: 'none', margin: '10px' }}>
                  <img
                    src={`http://localhost:5000${product.imageUrl}`}
                    alt={product.productDisplayName}
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                  <p>{product.productDisplayName}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found based on your preferences.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StyleQuiz;


