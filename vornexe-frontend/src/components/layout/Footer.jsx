import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>VORNEXE</h2>
          <p>1-OF-1 ARCHIVE.</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h3>SUPPORT</h3>
            <Link to="/faq">FAQ</Link>
            <Link to="/shipping">Shipping</Link>
            <Link to="/returns">Returns</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="link-group">
            <h3>SOCIAL</h3>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
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
