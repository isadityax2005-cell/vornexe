import React from 'react';
import './CustomerReviews.css';

const reviews = [
  {
    id: 1,
    name: '@karan.fits',
    text: "Quality is absolutely insane for the price. Fits perfectly.",
    rating: 5,
    imageUrl: "https://pikaso.cdnpk.net/private/production/5305170301/render.jpg?token=exp=1788480000~hmac=296a6aed23fbc07c9323400d10f486c109fd7b7265def16b73a421f84ef292cb",
    date: "2 Days Ago"
  },
  {
    id: 2,
    name: '@streetwear.in',
    text: "Arrived exactly as described. Premium packaging. 10/10.",
    rating: 5,
    imageUrl: "https://pikaso.cdnpk.net/private/production/5305170703/render.jpg?token=exp=1788480000~hmac=6d9017d8c4f9e28694d845bea0a4f3b336045f40809c5070a687d4e4d5ab0c5d",
    date: "1 Week Ago"
  },
  {
    id: 3,
    name: '@rahul_vsn',
    text: "Cop it before it sells out. Real 1-of-1 archive feel.",
    rating: 5,
    imageUrl: "https://pikaso.cdnpk.net/private/production/5305170724/render.jpg?token=exp=1788480000~hmac=328560f46feace2ad3bd552a0ff2226bcaf3b08932b2dba51df37083827f68b0",
    date: "2 Weeks Ago"
  }
];

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
