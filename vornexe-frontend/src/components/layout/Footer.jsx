import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-promo">
        <p>GET 15% OFF YOUR FIRST ORDER WITH CODE "FIRST15"
          <button 
            className="footer-promo-copy-btn"
            onClick={() => {
              navigator.clipboard.writeText("FIRST15");
              alert("Promo code FIRST15 copied to clipboard!");
            }} 
          >
            COPY
          </button>
        </p>
      </div>
      <div className="footer-content">
        <div className="footer-logo">
          <h2>VORNEXE</h2>
          <p>1-OF-1 ARCHIVE.</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h3>SUPPORT</h3>
            <Link to="/shipping">Shipping Info</Link>
            <Link to="/returns">Returns Policy</Link>
            <Link to="/size-guide">Size Guide</Link>
            <a href="mailto:vornexe.official@gmail.com">vornexe.official@gmail.com</a>
          </div>
          <div className="link-group">
            <h3>SOCIAL</h3>
            <a href="https://www.instagram.com/vornexe" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <div className="link-group">
            <h3>LEGAL</h3>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} VORNEXE. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Footer;
