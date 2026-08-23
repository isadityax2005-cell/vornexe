import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './PrivacyPolicy.css'; // Reusing the same CSS for legal pages

const ShippingPolicy = () => {
  return (
    <>
      <Header />
      <div className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">SHIPPING INFO</h1>
          <p className="legal-updated">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <div className="legal-content">
            <section>
              <h2>1. Delivery Timeframe</h2>
              <p>
                At VORNEXE, we understand your excitement to receive your 1-of-1 archive pieces. We process and dispatch all orders promptly. 
                You can expect your shipment to arrive within <strong>4 to 7 working days</strong> from the date of order confirmation. 
                Please note that delivery times may occasionally vary depending on your location and unforeseen courier delays.
              </p>
            </section>
            
            <section>
              <h2>2. Shipment Tracking</h2>
              <p>
                Once your order has been dispatched from our facility, you will receive a confirmation email and SMS containing your 
                unique tracking number. You can use this tracking information to monitor the real-time status and location of your package 
                until it reaches your doorstep. We partner with reliable delivery services to ensure your items are handled with care.
              </p>
            </section>

            <section>
              <h2>3. Dispatch & Processing</h2>
              <p>
                Since every item in our archive is a unique 1-of-1 piece, our packaging and processing are handled with meticulous attention to detail.
                Orders placed on weekends or public holidays will be processed on the next business day.
              </p>
            </section>

            <section>
              <h2>4. Shipping Issues</h2>
              <p>
                If your package is delayed beyond the estimated 4-7 working days, or if you experience any issues with the delivery process,
                please reach out to us at <strong>vornexe.official@gmail.com</strong> with your order ID, and we will assist you immediately.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShippingPolicy;
