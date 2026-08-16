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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreePolicy) {
      alert("You must agree to the Return Policy to sign up.");
      return;
    }
    setSubmitted(true);
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
              <p>Your account has been created successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="signup-form">
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
              
              <button type="submit" className="submit-btn">CREATE ACCOUNT</button>
            </form>
          )}
        </div>
      </main>
    </>
  );
};

export default Signup;
