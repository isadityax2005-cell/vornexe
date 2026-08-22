import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import './FeaturedProducts.css';

const FeaturedProducts = () => {
  const { products, loading, error } = useProducts();

  // Show only first 4 available products
  const featured = products
    .filter(p => !p.isSoldOut)
    .slice(0, 4);

  if (loading) return null; // Don't show a loading state on homepage — keep it clean
  if (error || featured.length === 0) return null;

  return (
    <section className="featured-section">
      <div className="featured-container">
        <div className="featured-header">
          <h2>THE ARCHIVE</h2>
          <p className="featured-subtitle">LATEST PIECES</p>
        </div>

        <div className="featured-grid">
          {featured.map(product => (
            <Link to={`/shop/${product.id}`} key={product.id} className="featured-card">
              <div className="featured-image-container">
                {product.imageUrls && product.imageUrls.length > 0 ? (
                  <>
                    <img 
                      src={product.imageUrls[0]} 
                      alt={product.name} 
                      className={`featured-img main-img ${product.imageUrls.length > 1 ? 'has-hover' : ''}`}
                    />
                    {product.imageUrls.length > 1 && (
                      <img 
                        src={product.imageUrls[1]} 
                        alt={`${product.name} alternate view`} 
                        className="featured-img hover-img"
                      />
                    )}
                  </>
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <div className="featured-info">
                <h3>{product.name}</h3>
                <div className="featured-meta">
                  <span>Size {product.size}</span>
                  <span>₹{product.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="featured-cta-row">
          <Link to="/shop" className="view-all-btn">
            VIEW FULL ARCHIVE →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
