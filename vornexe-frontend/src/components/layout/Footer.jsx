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
            <Link to="/shipping">Shipping Info</Link>
            <Link to="/returns">Returns Policy</Link>
            <a href="mailto:vornexe.official@gmail.com">vornexe.official@gmail.com</a>
            <p className="footer-trust-note">Strict No-Return policy. All 1-of-1 sales are final.</p>
          </div>
          <div className="link-group">
            <h3>SOCIAL</h3>
            <a href="https://www.instagram.com/vornexe" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
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
