import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/VirtualTryOn.css'; // Import the CSS file

const VirtualTryOn = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products based on search term
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/products/search?name=${searchTerm}`);
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  // Handle the product click for virtual try-on
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="virtual-try-on-container">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search for a product"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <div className="products-container">
        {products && products.length > 0 ? (
          <div className="product-list">
            {products.map(product => (
              <div 
                className="product-item" 
                key={product.productId} 
                onClick={() => handleProductClick(product)} // Make product clickable
              >
                <img src={product.imageUrl} alt={product.productDisplayName} className="product-image"/>
                <p>{product.productDisplayName}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Virtual Try-On Section */}
      {selectedProduct && (
        <div className="try-on-container">
          <h2>Virtual Try-On for {selectedProduct.productDisplayName}</h2>
          <img src={selectedProduct.imageUrl} alt={selectedProduct.productDisplayName} className="try-on-product-image"/>
          {/* Add the AR/AI try-on logic here */}
        </div>
      )}
    </div>
  );
};

export default VirtualTryOn;
