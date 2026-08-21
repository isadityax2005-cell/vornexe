import React, { useState } from 'react';
import './CollabSection.css';

const CollabSection = () => {
  const [formData, setFormData] = useState({
    brandName: '',
    email: '',
    link: '',
    proposal: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/collab`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send pitch.');
      }

      setStatus('success');
      setFormData({ brandName: '', email: '', link: '', proposal: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <section className="collab-section">
      <div className="collab-container">
        <div className="collab-header">
          <h2>COLLABORATE</h2>
          <p className="collab-subtitle">PARTNER WITH VORNEXE</p>
        </div>

        <div className="collab-content">
          <div className="collab-info">
            <h3>WE ARE ALWAYS LOOKING FOR INNOVATORS.</h3>
            <p>
              VORNEXE is built on exclusivity and architectural design. We are open to collaborating with like-minded brands, designers, and creatives who share our vision for uncompromising quality and 1-of-1 pieces.
            </p>
            <p>
              Submit your pitch using the portal. If your brand aligns with our aesthetic, we will be in touch.
            </p>
          </div>

          <div className="collab-form-wrapper">
            {status === 'success' ? (
              <div className="collab-success animate-fade-in">
                <h3>PITCH RECEIVED</h3>
                <p>Thank you for reaching out. Your proposal has been sent directly to our team. We will review it and contact you if there is a mutual fit.</p>
                <button className="submit-btn" onClick={() => setStatus('idle')}>SEND ANOTHER</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="collab-form">
                {status === 'error' && <div className="error-message">{errorMsg}</div>}
                
                <div className="form-group">
                  <input 
                    type="text" 
                    name="brandName" 
                    placeholder="BRAND / DESIGNER NAME" 
                    value={formData.brandName}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="CONTACT EMAIL" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="form-group">
                  <input 
                    type="url" 
                    name="link" 
                    placeholder="WEBSITE OR INSTAGRAM LINK" 
                    value={formData.link}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <textarea 
                    name="proposal" 
                    placeholder="YOUR COLLABORATION PROPOSAL" 
                    value={formData.proposal}
                    onChange={handleChange}
                    rows="5"
                    required 
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn" disabled={status === 'loading'}>
                  {status === 'loading' ? 'SENDING...' : 'SUBMIT PITCH'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollabSection;
