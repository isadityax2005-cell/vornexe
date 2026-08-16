import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="video-wrapper">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video"
        >
          <source src="/VORNEXE.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="hero-content animate-fade-in">
        <Link to="/shop" className="shop-button">
          SHOP HERE
        </Link>
      </div>

      <div className="hero-bottom-nav">
        <Link to="/shop">PRODUCTS</Link>
        <Link to="/signup">SIGN UP</Link>
        <Link to="/size-guide">SIZE GUIDE</Link>
        <Link to="/sustainability">SUSTAINABILITY</Link>
        <Link to="/foundation">FOUNDATION</Link>
        <Link to="/terms">TERMS</Link>
        <Link to="/privacy">PRIVACY POLICY</Link>
        <Link to="/about">ABOUT US</Link>
      </div>
    </section>
  );
};

export default HeroSection;
