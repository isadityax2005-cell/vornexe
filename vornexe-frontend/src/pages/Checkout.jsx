import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import './Checkout.css';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    transactionId: '' // For UPI
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/products');
        const data = await res.json();
        const found = data.find(p => p.id === id);
        if (found && !found.isSoldOut) {
          setProduct(found);
        } else {
          setError('Product is unavailable or sold out.');
        }
      } catch (err) {
        setError('Failed to load product for checkout.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.id,
          shippingDetails: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pinCode: formData.pinCode
          },
          paymentMethod: 'UPI',
          transactionId: formData.transactionId
        })
      });

      if (!res.ok) throw new Error('Failed to process order');
      
      // On success, redirect to home or a success page
      alert("Order placed successfully! We will verify your UPI payment.");
      navigate('/shop');
    } catch (err) {
      alert(err.message);
      setSubmitting(false);
    }
  };

  if (loading) return <div className="checkout-loading">Loading Checkout...</div>;
  if (error || !product) return (
    <div className="checkout-error">
      <h2>{error}</h2>
      <Link to="/shop">RETURN TO SHOP</Link>
    </div>
  );

  return (
    <>
      <Header />
      <main className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-form-section">
            <h1>SECURE CHECKOUT</h1>
            
            <form onSubmit={handleSubmit} className="checkout-form">
              <section className="form-section">
                <h2>1. CONTACT DETAILS</h2>
                <div className="form-group">
                  <input type="text" name="fullName" placeholder="FULL NAME" required onChange={handleChange} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input type="email" name="email" placeholder="EMAIL ADDRESS" required onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="tel" name="phone" placeholder="PHONE NUMBER" required onChange={handleChange} />
                  </div>
                </div>
              </section>

              <section className="form-section">
                <h2>2. SHIPPING ADDRESS</h2>
                <div className="form-group">
                  <input type="text" name="address" placeholder="STREET ADDRESS" required onChange={handleChange} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" name="city" placeholder="CITY" required onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" name="state" placeholder="STATE" required onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" name="pinCode" placeholder="PIN CODE" required onChange={handleChange} />
                  </div>
                </div>
              </section>

              <section className="form-section payment-section">
                <h2>3. PAYMENT (UPI)</h2>
                <div className="upi-instructions">
                  <p>Please scan the QR code or send exactly <strong>${product.price}</strong> to the UPI ID below.</p>
                  <div className="upi-details">
                    <span className="upi-id">vornexe@upi</span>
                  </div>
                  <p className="upi-note">After paying, enter your 12-digit UPI Transaction ID below to verify your order.</p>
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="transactionId" 
                    placeholder="ENTER UPI TRANSACTION ID" 
                    required 
                    onChange={handleChange} 
                  />
                </div>
              </section>

              <button type="submit" className="place-order-btn" disabled={submitting}>
                {submitting ? 'PROCESSING...' : 'PLACE ORDER'}
              </button>
            </form>
          </div>

          <div className="checkout-summary-section">
            <h2>ORDER SUMMARY</h2>
            <div className="summary-item">
              <img src={product.imageUrl} alt={product.name} />
              <div className="summary-item-details">
                <h3>{product.name}</h3>
                <p>Size: {product.size}</p>
                <p className="summary-price">${product.price}</p>
              </div>
            </div>
            
            <div className="summary-totals">
              <div className="total-row">
                <span>SUBTOTAL</span>
                <span>${product.price}</span>
              </div>
              <div className="total-row">
                <span>SHIPPING</span>
                <span>FREE</span>
              </div>
              <div className="total-row grand-total">
                <span>TOTAL</span>
                <span>${product.price}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;
