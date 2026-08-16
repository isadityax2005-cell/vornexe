import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import useProducts from '../hooks/useProducts';
import './Shop.css';

const Shop = () => {
  const { products, loading, error } = useProducts();

  return (
    <>
      <Header />
      <main className="shop-page">
        <div className="shop-header">
          <h2>1-OF-1 ARCHIVE</h2>
          <p>Every piece is unique. Once it's gone, it's gone.</p>
        </div>

        {loading && <div className="loading-state">Loading archive...</div>}
        {error && <div className="error-state">Failed to load archive.</div>}

        {!loading && !error && (
          <div className="product-grid">
            {products.map(product => (
              <Link to={`/shop/${product.id}`} key={product.id} style={{textDecoration: 'none'}}>
                <div className="product-card">
                  <div className="product-image-container">
                    <img src={product.imageUrl} alt={product.name} />
                    {product.isSoldOut && <div className="sold-out-badge">SOLD OUT</div>}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-meta">
                      <span className="product-size">Size {product.size}</span>
                      <span className="product-price">₹{product.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Shop;
