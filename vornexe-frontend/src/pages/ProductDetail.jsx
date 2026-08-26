import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import SEO from '../components/common/SEO';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === product?.id);

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
      {product && (
        <SEO 
          title={product.name}
          description={product.description}
          image={product.imageUrls?.[0]}
          productData={product}
        />
      )}
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
              {product.imageUrls && product.imageUrls.length > 0 ? (
                <>
                  <img src={product.imageUrls[currentImageIndex]} alt={product.name} />
                  {product.imageUrls.length > 1 && (
                    <div className="carousel-controls">
                      <button 
                        className="carousel-btn prev"
                        onClick={() => setCurrentImageIndex((prev) => prev === 0 ? product.imageUrls.length - 1 : prev - 1)}
                      >
                        &#10094;
                      </button>
                      <div className="carousel-dots">
                        {product.imageUrls.map((_, idx) => (
                          <span 
                            key={idx} 
                            className={`dot ${currentImageIndex === idx ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndex(idx)}
                          />
                        ))}
                      </div>
                      <button 
                        className="carousel-btn next"
                        onClick={() => setCurrentImageIndex((prev) => prev === product.imageUrls.length - 1 ? 0 : prev + 1)}
                      >
                        &#10095;
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-image">No Image Available</div>
              )}
            </div>
            
            <div className="product-detail-info">
              <h1>{product.name}</h1>
              
              <div className="product-detail-meta">
                <span className="detail-price">{product.price ? `₹${product.price}` : 'Price TBD'}</span>
                <span className="detail-size">
                  SIZE {product.size || 'TBD'}
                  <Link to="/size-guide" style={{fontSize: '0.8rem', marginLeft: '1rem', textDecoration: 'underline', color: 'var(--text-secondary)'}}>Size Guide</Link>
                </span>
              </div>

              {product.isSoldOut ? (
                <div className="status-badge sold-out">SOLD OUT</div>
              ) : (
                <div className="status-badge available">1-OF-1 AVAILABLE</div>
              )}

              <div className="action-buttons">
                <button 
                  className="add-to-cart-btn" 
                  disabled={product.isSoldOut || isInCart || product.isReserved}
                  onClick={() => addToCart(product)}
                >
                  {product.isSoldOut ? 'UNAVAILABLE' : product.isReserved ? 'RESERVED' : isInCart ? 'ADDED TO BAG' : 'ADD TO BAG'}
                </button>
                {!product.isSoldOut && (
                  <button 
                    className="buy-now-btn" 
                    disabled={product.isReserved}
                    onClick={async () => {
                      if (!isInCart) {
                        await addToCart(product);
                      }
                      navigate(`/checkout/${product.id}`);
                    }}
                  >
                    BUY NOW
                  </button>
                )}
              </div>

              <div className="product-accordions">
                <details className="accordion-item" open>
                  <summary>FIT & SIZING</summary>
                  <div className="accordion-content">
                    <p className="fit-note"><em>Oversized architectural silhouette. We recommend your usual size for the intended fit.</em></p>
                    <Link to="/size-guide" style={{display: 'inline-block', marginTop: '1rem', textDecoration: 'underline'}}>View Universal Size Guide</Link>
                  </div>
                </details>
                <details className="accordion-item">
                  <summary>MATERIAL</summary>
                  <div className="accordion-content">
                    <p>Heavyweight 100% Cotton. Custom milled and treated.</p>
                  </div>
                </details>
                <details className="accordion-item">
                  <summary>SHIPPING & RETURNS</summary>
                  <div className="accordion-content">
                    <p><strong>Shipping:</strong> Ships within 2-4 business days.</p>
                    <p><strong>Returns:</strong> Strict No-Return policy. All 1-of-1 sales are final.</p>
                  </div>
                </details>
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
                    {p.imageUrls && p.imageUrls.length > 0 ? (
                      <img src={p.imageUrls[0]} alt={p.name} />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <h3>{p.name}</h3>
                  <p>{p.price ? `₹${p.price}` : 'Price TBD'} - Size {p.size || 'TBD'}</p>
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
