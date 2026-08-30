import React from 'react';
import './CustomerReviews.css';

const reviews = [
  {
    id: 1,
    name: '@karan.fits',
    text: "Quality is absolutely insane for the price. Fits perfectly.",
    rating: 5,
    imageUrl: "/review1.jpg",
    date: "2 Days Ago"
  },
  {
    id: 2,
    name: '@streetwear.in',
    text: "Arrived exactly as described. Premium packaging. 10/10.",
    rating: 5,
    imageUrl: "https://pikaso.cdnpk.net/private/production/5305184622/render.jpg?token=exp=1788480000~hmac=d2ccf9e48b0c2e3e79fe15326f88a481f42c2a14f61e22d9dff54c2970308ba9",
    date: "1 Week Ago"
  },
  {
    id: 3,
    name: '@rahul_vsn',
    text: "Cop it before it sells out. Real 1-of-1 archive feel.",
    rating: 5,
    imageUrl: "https://pikaso.cdnpk.net/private/production/5305184738/render.jpg?token=exp=1788480000~hmac=8501272fbd8f4b02dea629686f4e009a0e10e5aa55fd2fecf10f95168a2068d5",
    date: "2 Weeks Ago"
  },
  {
    id: 4,
    name: '@archive.fits',
    text: "The details on this piece are insane. Perfect crop.",
    rating: 5,
    imageUrl: "/review4.jpg",
    date: "3 Weeks Ago"
  },
  {
    id: 5,
    name: '@mumbai_drip',
    text: "Best drop of the year. Quality is unmatched.",
    rating: 5,
    imageUrl: "/review5.jpg",
    date: "1 Month Ago"
  },
  {
    id: 6,
    name: '@y2k.india',
    text: "Obsessed with the texture and fit. Def buying more.",
    rating: 5,
    imageUrl: "/review6.jpg",
    date: "1 Month Ago"
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
