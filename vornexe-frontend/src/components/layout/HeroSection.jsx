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
        <p className="hero-drop-label">EXCLUSIVE 1-OF-1 ARCHIVE</p>
        <h1 className="hero-drop-title">DROP 001</h1>
        <Link to="/shop" className="hero-cta">
          SHOP NOW
        </Link>
      </div>

      <div className="hero-scroll-indicator">
        <span className="scroll-text">SCROLL</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default HeroSection;
