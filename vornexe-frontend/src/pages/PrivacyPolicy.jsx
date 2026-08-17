import React from 'react';
import Header from '../components/layout/Header';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <main className="privacy-page">
        <div className="privacy-container animate-fade-in">
          <h1>PRIVACY POLICY & RETURNS</h1>
          
          <div className="policy-content">
            <section>
              <h2>1. NO RETURNS OR EXCHANGES</h2>
              <p>
                All sales at Vornexe are final. Every product we sell is a 1-of-1 vintage thrift piece. Because these items are unique and carefully curated, <strong>we do not accept returns, refunds, or exchanges under any circumstances</strong>. 
              </p>
              <p>
                Please review all product images, read the item descriptions, and check the size chart and measurements thoroughly before completing your purchase. Minor wear and tear is expected with vintage items and adds to the character of the piece.
              </p>
            </section>

            <section>
              <h2>2. PRIVACY & DATA COLLECTION</h2>
              <p>
                When you sign up or place an order, we collect your name, email address, phone number, and shipping address. This information is strictly used to process your orders, deliver your items, and communicate with you regarding your purchases.
              </p>
              <p>
                We do not sell, rent, or trade your personal information to any third parties. If you opted in to receive our newsletter, we may occasionally send you emails about new 1-of-1 drops and archive releases. You can opt out at any time.
              </p>
            </section>

            <section>
              <h2>3. SECURE PAYMENTS</h2>
              <p>
                All payments are processed securely through Razorpay. We do not store or have direct access to your credit card numbers, UPI PINs, or bank account details.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default PrivacyPolicy;
