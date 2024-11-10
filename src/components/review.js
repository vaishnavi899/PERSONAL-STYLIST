import React from 'react';
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
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>&#9733;</span>
    ));
  };

  return (
    <div className="review-section">
      <h2 className="section-title">Customer Reviews</h2>
      {reviews.map((review, index) => (
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
    </div>
  );
};

export default ReviewSection;
