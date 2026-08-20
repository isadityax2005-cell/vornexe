import React from 'react';
import Header from '../components/layout/Header';
import './PrivacyPolicy.css'; // Reusing the same sleek layout

const Sustainability = () => {
  return (
    <>
      <Header />
      <main className="privacy-page">
        <div className="privacy-container animate-fade-in">
          <h1>SUSTAINABILITY</h1>
          
          <div className="policy-content">
            <section>
              <h2>CIRCULAR FASHION</h2>
              <p>
                Beyond aesthetics, choosing to thrift is a powerful step towards sustainability. By giving pre-loved vintage garments a second life, we are actively participating in a circular economy, reducing fashion waste, and combating the environmental impact of fast fashion. Together, we can make sustainable choices look incredible.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Sustainability;
