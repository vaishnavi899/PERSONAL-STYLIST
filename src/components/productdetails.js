// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/productdetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = async () => {
    try {
      await fetch(`http://localhost:5000/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ review }),
      });
      setReview('');
      alert('Review submitted!');
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div className="product-details">
      {product ? (
        <>
          <div className="product-image">
            <img src={product.imageUrl} alt={product.productDisplayName} />
          </div>
          <div className="product-info">
            <h1>{product.productDisplayName}</h1>
            <p>Category: {product.masterCategory} / {product.subCategory}</p>
            <p>Gender: {product.gender}</p>
            <p>Color: {product.baseColour}</p>
            <p>Season: {product.season}</p>
            <p>Year: {product.year}</p>
            <p>Usage: {product.usage}</p>
          </div>
          <div className="review-section">
            <h2>Leave a Review</h2>
            <textarea 
              value={review}
              onChange={handleReviewChange}
              placeholder="Write your review here..."
            />
            <button onClick={handleReviewSubmit}>Submit Review</button>
          </div>
        </>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;
