import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'idle', 'submitting', 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2>STAY CONNECTED</h2>
        <p>Sign up to our newsletter for exclusive updates, early access to 1-of-1 drops, and hidden archives.</p>
        
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input 
            type="email" 
            placeholder="ENTER YOUR EMAIL" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'submitting' || status === 'success'}
            required
          />
          <button 
            type="submit" 
            disabled={status === 'submitting' || status === 'success'}
          >
            {status === 'submitting' ? '...' : status === 'success' ? 'JOINED' : 'SIGN UP'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
