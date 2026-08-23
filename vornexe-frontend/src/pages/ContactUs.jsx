import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error('Failed to send message');
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <>
      <Header />
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-info">
            <h1 className="contact-title">CONTACT US</h1>
            <p className="contact-description">
              Have a question about a piece? Need assistance with your order? 
              Reach out to our team and we'll get back to you as soon as possible.
            </p>
            <div className="contact-email">
              <h3>SUPPORT EMAIL</h3>
              <a href="mailto:vornexe.official@gmail.com">vornexe.official@gmail.com</a>
            </div>
          </div>
          
          <div className="contact-form-container">
            {status === 'success' ? (
              <div className="contact-success">
                <h3>MESSAGE SENT</h3>
                <p>Thank you for reaching out. Our team will review your inquiry and respond to your email shortly.</p>
                <button className="contact-submit-btn" onClick={() => setStatus('idle')}>SEND ANOTHER MESSAGE</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>NAME</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="ENTER YOUR NAME"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>EMAIL</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="ENTER YOUR EMAIL"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>MESSAGE</label>
                  <textarea 
                    required 
                    rows="6"
                    placeholder="DESCRIBE YOUR INQUIRY OR ISSUE"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                
                {status === 'error' && (
                  <p className="contact-error">Failed to send message. Please try again or email us directly.</p>
                )}
                
                <button type="submit" className="contact-submit-btn" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
