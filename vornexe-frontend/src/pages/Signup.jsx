import React, { useState } from 'react';
import Header from '../components/layout/Header';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    subscribe: false,
    agreePolicy: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.agreePolicy) {
      setError("You must agree to the Return Policy to sign up.");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="signup-page">
        <div className="signup-container animate-fade-in">
          <h1>SIGN UP</h1>
          
          {submitted ? (
            <div className="success-message">
              <h2>Welcome to Vornexe</h2>
              <p>Your account has been created successfully. A confirmation email has been sent to your inbox.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="signup-form">
              {error && <div className="error-message" style={{ color: '#ff4444', marginBottom: '1rem', textAlign: 'center', backgroundColor: 'rgba(255, 68, 68, 0.1)', padding: '10px', borderRadius: '4px' }}>{error}</div>}
              <div className="form-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="FULL NAME" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="EMAIL ADDRESS" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="PHONE NUMBER" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <textarea 
                  name="address" 
                  placeholder="SHIPPING ADDRESS" 
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required 
                ></textarea>
              </div>
              
              <div className="checkbox-group">
                <input 
                  type="checkbox" 
                  id="subscribe" 
                  name="subscribe"
                  checked={formData.subscribe}
                  onChange={handleChange}
                />
                <label htmlFor="subscribe">
                  Receive emails and subscribe for new products info.
                </label>
              </div>
              
              <div className="policy-section">
                <h3>IMPORTANT POLICY</h3>
                <p>
                  Once the product is bought it won't be replaced or returned back, due to this product is 1/1 and please go through the size chart and measurements thoroughly.
                </p>
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="agreePolicy" 
                    name="agreePolicy"
                    checked={formData.agreePolicy}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="agreePolicy">
                    I have read and agree to the No-Return Policy.
                  </label>
                </div>
              </div>
              
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
            </form>
          )}
        </div>
      </main>
    </>
  );
};

export default Signup;
