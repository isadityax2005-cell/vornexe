import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const res = await fetch(`${apiUrl}/api/products`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        const found = data.find(p => p.id === id);
        
        if (found) {
          setProduct(found);
          // Get up to 3 random other products
          const others = data.filter(p => p.id !== id && !p.isSoldOut);
          setOtherProducts(others.sort(() => 0.5 - Math.random()).slice(0, 3));
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  return (
    <>
      <Header />
      <main className="product-detail-page">
        <div className="back-link-container">
          <Link to="/shop" className="back-link">← BACK TO SHOP</Link>
        </div>

        {loading && <div className="loading-state">Loading...</div>}
        {error && <div className="error-state">{error}</div>}

        {!loading && !error && product && (
          <div className="product-detail-container">
            <div className="product-detail-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            
            <div className="product-detail-info">
              <h1>{product.name}</h1>
              
              <div className="product-detail-meta">
                <span className="detail-price">₹{product.price}</span>
                <span className="detail-size">SIZE {product.size}</span>
              </div>

              {product.isSoldOut ? (
                <div className="status-badge sold-out">SOLD OUT</div>
              ) : (
                <div className="status-badge available">1-OF-1 AVAILABLE</div>
              )}

              <div className="product-description">
                <p>{product.description}</p>
              </div>

              <div className="action-buttons">
                <button 
                  className="add-to-cart-btn" 
                  disabled={product.isSoldOut}
                >
                  {product.isSoldOut ? 'UNAVAILABLE' : 'ADD TO BAG'}
                </button>
                {!product.isSoldOut && (
                  <button 
                    className="buy-now-btn" 
                    onClick={() => navigate(`/checkout/${product.id}`)}
                  >
                    BUY NOW
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {!loading && !error && otherProducts.length > 0 && (
          <div className="explore-more-section">
            <h2>EXPLORE MORE</h2>
            <div className="explore-grid">
              {otherProducts.map(p => (
                <Link to={`/shop/${p.id}`} key={p.id} className="explore-card">
                  <div className="explore-image-container">
                    <img src={p.imageUrl} alt={p.name} />
                  </div>
                  <h3>{p.name}</h3>
                  <p>₹{p.price} - Size {p.size}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default ProductDetail;
