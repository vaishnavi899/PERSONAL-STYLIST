import React, { useEffect, useState } from 'react';
import '../App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the product data from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');  // Your backend API URL
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON data from response
        setProducts(data); // Set the products state
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error loading products: {error}</h2>;
  }

  // Limit the number of products displayed to 50
  const productsToShow = products.slice(0, 50);

  return (
    <div className="product-page">
      <h1>Product List</h1>
      <div className="product-grid">
        {productsToShow.length > 0 ? (
          productsToShow.map((product) => (
            <div key={product.productId} className="product-card">
              <img src={product.imageUrl} alt={product.productDisplayName} />
              <h3>{product.productDisplayName}</h3>
              <p>Category: {product.masterCategory} / {product.subCategory}</p>
              <p>Gender: {product.gender}</p>
              <p>Color: {product.baseColour}</p>
              <p>Season: {product.season}</p>
              <p>Year: {product.year}</p>
              <p>Usage: {product.usage}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default App;
