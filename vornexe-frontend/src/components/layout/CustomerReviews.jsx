import React from 'react';
import './CustomerReviews.css';
import { reviews } from '../../data/reviewsData';

const CustomerReviews = () => {
  return (
    <section className="customer-reviews-section">
      <div className="reviews-header">
        <h2>COMMUNITY</h2>
        <p className="reviews-subtitle">VERIFIED FIT CHECKS & REVIEWS</p>
      </div>
      
      <div className="reviews-scroll-container">
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-image-wrapper">
                <img src={review.imageUrl} alt={`Review from ${review.name}`} className="review-image" loading="lazy" />
              </div>
              <div className="review-content">
                <div className="review-stars">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                <p className="review-text">"{review.text}"</p>
                <div className="review-meta">
                  <span className="review-author">{review.name}</span>
                  <span className="review-verified">✓ Verified Buyer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
