import React from 'react';
import './CustomerReviews.css';

const reviews = [
  {
    id: 1,
    name: '@karan.fits',
    text: "Quality is absolutely insane for the price. Fits perfectly.",
    rating: 5,
    imageUrl: "https://pikaso.cdnpk.net/private/production/5305019043/render.jpg?token=exp=1788480000~hmac=c269bb5f2aac8a1cdefb18f8fda8d6d53a818919bedf4643ccba5714f0d508fc",
    date: "2 Days Ago"
  },
  {
    id: 2,
    name: '@streetwear.in',
    text: "Arrived exactly as described. Premium packaging. 10/10.",
    rating: 5,
    imageUrl: "https://pikaso.cdnpk.net/private/production/5305019201/render.jpg?token=exp=1788480000~hmac=9cecd1f6ba794ad15683c901f09cf6c0283442fb5becc33b0a1772e6861ff4df",
    date: "1 Week Ago"
  },
  {
    id: 3,
    name: '@rahul_vsn',
    text: "Cop it before it sells out. Real 1-of-1 archive feel.",
    rating: 5,
    imageUrl: "https://pikaso.cdnpk.net/private/production/5305019047/render.jpg?token=exp=1788480000~hmac=92a45622dbd7f15337184500899a9b3d6ec11606443401605faa7c3069537414",
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
