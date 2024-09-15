import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/productpage.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 32;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Pagination buttons logic
  const createPageButtons = () => {
    const buttons = [];
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + 3, totalPages);

    if (end - start < 3) {
      start = Math.max(end - 3, 1);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(i);
    }

    if (buttons.length < 4 && totalPages > 4) {
      buttons.unshift('...');
      buttons.push(totalPages);
    }

    return buttons;
  };

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle product click
  const handleProductClick = (productId) => {
    if (productId) {
      navigate(`/products/${productId}`);
    }
  };

  return (
    <div className="product-page">
      <div className="product-container">
        <h1>Product List</h1>
        <div className="product-grid">
          {loading ? (
            <h2>Loading...</h2>
          ) : error ? (
            <h2>Error loading products: {error}</h2>
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div
                key={product.productId}
                className="product-card"
                onClick={() => handleProductClick(product.productId)}
              >
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
        <div className="pagination">
          {createPageButtons().map((button, index) => (
            button === '...' ? (
              <span key={index} className="page-button">
                {button}
              </span>
            ) : (
              <button
                key={index}
                className={`page-button ${button === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(button)}
              >
                {button}
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
