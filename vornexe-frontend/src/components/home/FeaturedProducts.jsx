import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const { products, loading, error } = useProducts();

  // Show only up to 4 items on the homepage
  const featured = products.slice(0, 4);

  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2>PRODUCTS</h2>
        <Link to="/shop" className="view-all-link">VIEW ALL</Link>
      </div>

      {loading && <div className="loading-state">Loading archive...</div>}
      {error && <div className="error-state">Failed to load archive.</div>}

      {!loading && !error && (
        <div className="featured-grid">
          {featured.map(product => (
            <Link to={`/shop`} key={product.id} className="featured-card">
              <div className="featured-image-container">
                <img src={product.imageUrl} alt={product.name} />
                {product.isSoldOut && <div className="featured-sold-out">SOLD OUT</div>}
              </div>
              <div className="featured-info">
                <h3>{product.name}</h3>
                <div className="featured-meta">
                  <span>Size {product.size}</span>
                  <span>${product.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
