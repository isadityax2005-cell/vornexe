import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, toggleCart } = useCart();
  const cartCount = cartItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          
          <div className="header-left">
            <button 
              className="menu-button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="14" width="24" height="2" fill="white"/>
                <rect x="8" y="24" width="24" height="2" fill="white"/>
              </svg>
            </button>
          </div>

          <Link to="/" className="logo">
            <img src="/logo.png" alt="VORNEXE" style={{ height: '50px', objectFit: 'contain' }} />
          </Link>

          <div className="header-right">
            <button onClick={toggleCart} className="cart-button" aria-label="Cart" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
              <span className="cart-text">BAG</span>
              <div className="cart-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-close-container">
          <button 
            className="close-button"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav className="mobile-nav">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>SHOP</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
