import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import SEO from '../components/common/SEO';
import useProducts from '../hooks/useProducts';
import './Shop.css';

const Shop = () => {
  const { products, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name?.toLowerCase().includes(lowerQuery) || 
      p.description?.toLowerCase().includes(lowerQuery) ||
      p.size?.toLowerCase().includes(lowerQuery)
    );
  }, [products, searchQuery]);

  return (
    <>
      <SEO 
        title="Archive" 
        description="Browse the Vornexe exclusive 1-of-1 archive. Every piece is unique."
        url="https://vornexe.vercel.app/shop"
      />
      <Header />
      <main className="shop-page">
        <div className="shop-header">
          <h2>1-OF-1 ARCHIVE</h2>
          <p>Every piece is unique. Once it's gone, it's gone.</p>
        </div>

        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search archive (e.g., hoodie, XL, stone island)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading && <div className="loading-state">Loading archive...</div>}
        {error && <div className="error-state">Failed to load archive.</div>}

        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="no-results">No pieces found matching "{searchQuery}"</div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map(product => (
                  <Link to={`/shop/${product.id}`} key={product.id} className="product-card">
                    <div className="product-image-container">
                      {product.imageUrls && product.imageUrls.length > 0 ? (
                        <>
                          <img 
                            src={product.imageUrls[0]} 
                            alt={product.name} 
                            loading="lazy"
                            className={`product-img main-img ${product.imageUrls.length > 1 ? 'has-hover' : ''}`}
                          />
                          {product.imageUrls.length > 1 && (
                            <img 
                              src={product.imageUrls[1]} 
                              alt={`${product.name} alternate view`} 
                              loading="lazy"
                              className="product-img hover-img"
                            />
                          )}
                        </>
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                      {product.isSoldOut && <div className="sold-out-badge">SOLD OUT</div>}
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <div className="product-meta">
                        <span className="product-size">Size {product.size}</span>
                        <span className="product-price">₹{product.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Shop;
