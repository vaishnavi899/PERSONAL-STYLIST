import React, { useState } from 'react';
import '../styles/review.css';

const reviews = [
  {
    name: 'Jane Doe',
    date: 'September 22, 2024',
    rating: 5,
    comment: 'Amazing styling! I loved the personalized outfits. The quality of service was top-notch.',
    avatar: 'https://i.pravatar.cc/100?img=1'
  },
  {
    name: 'John Smith',
    date: 'September 15, 2024',
    rating: 4,
    comment: 'Great collection of styles, but delivery could be faster. Overall, a wonderful experience.',
    avatar: 'https://i.pravatar.cc/100?img=2'
  },
  {
    name: 'Alice Johnson',
    date: 'September 10, 2024',
    rating: 5,
    comment: 'Absolutely loved everything! The stylist was professional, and the styles were perfect for me.',
    avatar: 'https://i.pravatar.cc/100?img=3'
  }
];

const ReviewSection = () => {
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 1,
    comment: ''
  });

  const [reviewsList, setReviewsList] = useState(reviews);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value
    });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString(); // Get current date
    const avatar = `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 10) + 1}`; // Random avatar for simplicity
    const review = {
      ...newReview,
      date,
      avatar
    };

    // Add the new review to the list and reset form
    setReviewsList([review, ...reviewsList]);
    setNewReview({ name: '', rating: 1, comment: '' });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>&#9733;</span>
    ));
  };

  return (
    <div className="review-section">
      <h2 className="section-title">Customer Reviews</h2>
      {reviewsList.map((review, index) => (
        <div key={index} className="review-card">
          <img src={review.avatar} alt={`${review.name}'s avatar`} className="avatar" />
          <div className="review-content">
            <h3 className="review-name">{review.name}</h3>
            <p className="review-date">{review.date}</p>
            <div className="review-rating">{renderStars(review.rating)}</div>
            <p className="review-comment">{review.comment}</p>
          </div>
        </div>
      ))}

      {/* Write a Review Form */}
      <h3 className="write-review-title">Write a Review</h3>
      <form className="review-form" onSubmit={handleSubmitReview}>
        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newReview.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-field">
          <label>Rating</label>
          <select
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
            required
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Stars
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label>Comment</label>
          <textarea
            name="comment"
            value={newReview.comment}
            onChange={handleInputChange}
            placeholder="Write your review"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewSection;




































































































































