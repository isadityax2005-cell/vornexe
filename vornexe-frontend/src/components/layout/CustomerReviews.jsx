import React from 'react';
import './CustomerReviews.css';

const reviews = [
  {
    id: 1,
    name: '@karan.fits',
    text: "Quality is absolutely insane for the price. Fits perfectly.",
    rating: 5,
    imageUrl: "https://pikaso.cdnpk.net/private/production/5305115063/render.jpg?token=exp=1788480000~hmac=e01276a61b661b61cafe69d81afdb0ec21964fb7426c4e1857f843076eb2ed5e",
    date: "2 Days Ago"
  },
  {
    id: 2,
    name: '@streetwear.in',
    text: "Arrived exactly as described. Premium packaging. 10/10.",
    rating: 5,
    imageUrl: "https://pikaso.cdnpk.net/private/production/5305125527/render.jpg?token=exp=1788480000~hmac=891bb771b112efa6f653885cb563e2453997770bea5f0351ae0c6ed71d74b57b",
    date: "1 Week Ago"
  },
  {
    id: 3,
    name: '@rahul_vsn',
    text: "Cop it before it sells out. Real 1-of-1 archive feel.",
    rating: 5,
    imageUrl: "https://pikaso.cdnpk.net/private/production/5305125512/render.jpg?token=exp=1788480000~hmac=b204a361e41cbc4664f5aa0e92d947f8f1b3a52789ad4d501e679eb3aa33dfd5",
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
