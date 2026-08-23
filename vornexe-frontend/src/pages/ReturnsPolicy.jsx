import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './PrivacyPolicy.css'; 

const ReturnsPolicy = () => {
  return (
    <>
      <Header />
      <div className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">RETURNS POLICY</h1>
          <p className="legal-updated">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <div className="legal-content">
            <section>
              <h2>1. Strict No-Return Policy</h2>
              <p>
                At VORNEXE, we enforce a <strong>strict no-return, no-refund, and no-exchange policy</strong> on all purchases. 
                All sales made through our platform are considered final. Once an order is successfully placed and processed, 
                it cannot be cancelled, modified, or returned under any circumstances.
              </p>
            </section>
            
            <section>
              <h2>2. Why We Do Not Accept Returns</h2>
              <p>
                Our archive consists entirely of 1-of-1, hand-curated thrift and vintage pieces. Because each item is unique and completely 
                exclusive, managing inventory returns is not feasible. We dedicate significant effort to sourcing, verifying, and 
                archiving these rare garments. Restocking a 1-of-1 item compromises the exclusivity and logistical flow of our archive system.
              </p>
            </section>

            <section>
              <h2>3. Transparency & Product Variations</h2>
              <p>
                We value complete transparency with our community. Please be aware that the products you see in the editorial and detailed 
                shots on our website <strong>may not necessarily look exactly the same when you receive them</strong>. 
              </p>
              <p>
                Due to the inherent nature of vintage, thrifted, and upcycled fashion, garments may possess minor imperfections, fading, 
                distressing, or slight color variations that are not perfectly captured by studio lighting or AI-enhanced modeling previews. 
                These unique characteristics are what give 1-of-1 archive pieces their distinct identity and history. By purchasing from VORNEXE, 
                you acknowledge and accept these potential variations.
              </p>
            </section>

            <section>
              <h2>4. Damaged or Incorrect Items</h2>
              <p>
                In the highly unlikely event that you receive a completely incorrect item (e.g., a different product ID than what you ordered), 
                please contact us at <strong>vornexe.official@gmail.com</strong> within 24 hours of delivery with unboxing proof. 
                We will review these exceptionally rare cases at our sole discretion.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReturnsPolicy;
