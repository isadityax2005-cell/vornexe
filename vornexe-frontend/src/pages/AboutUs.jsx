import React from 'react';
import Header from '../components/layout/Header';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <>
      <Header />
      <main className="about-page">
        <div className="about-container animate-fade-in">
          <div className="about-content">
            <h1>ABOUT VORNEXE</h1>
            
            <div className="about-text">
              <p>
                Welcome to Vornexe – a curated vintage thrift store based in India.
              </p>
              <p>
                We are dedicated to bringing you the most unique crafted clothes, exclusive finds, and 1-of-1 pieces. Our collection is handpicked for individuals who appreciate the art of vintage fashion, distinct styles, and rare graphics that you won't find anywhere else.
              </p>
              <p>
                At Vornexe, we believe in the beauty of individuality. Every piece in our store tells its own story, carefully selected to offer something truly special for people who love standing out.
              </p>
            </div>
          </div>
          
          <div className="about-image">
            <img src="/logo.png" alt="Vornexe Logo" className="about-logo" />
          </div>
        </div>
      </main>
    </>
  );
};

export default AboutUs;
