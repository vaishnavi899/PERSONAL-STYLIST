import React, { useState } from 'react';
import axios from 'axios';

function ProductSuggestions() {
  const [image, setImage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/products/process-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <div>
      <h1>Product Styling Suggestions</h1>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleSubmit}>Get Suggestions</button>

      <div>
        <h2>Recommended Products:</h2>
        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((product) => (
              <li key={product._id}>
                <img src={product.imageUrl} alt={product.productDisplayName} width={100} />
                <p>{product.productDisplayName}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No suggestions available.</p>
        )}
      </div>
    </div>
  );
}

export default ProductSuggestions;
