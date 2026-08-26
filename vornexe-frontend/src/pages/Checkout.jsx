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

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const getFinalPrice = () => {
    if (!product) return 0;
    if (discountApplied) {
      return Math.round(product.price * 0.85); // 15% off
    }
    return product.price;
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      setSubmitting(false);
      return;
    }

    try {
      // 1. Create order on backend
      const finalAmount = getFinalPrice();
      const orderRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalAmount })
      });
      const orderData = await orderRes.json();

      if (!orderData || !orderData.id) throw new Error("Server error creating payment order");

      // 2. Initialize Razorpay popup
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "VORNEXE ARCHIVE",
        description: product.name,
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Send successful payment data to backend to verify and save order
          try {
            const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
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
                paymentMethod: 'Razorpay',
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                discountCode: discountApplied ? 'FIRST15' : '',
                finalPrice: finalAmount
              })
            });

            if (!verifyRes.ok) throw new Error("Payment verification failed");

            alert("Payment Successful! Order placed.");
            navigate('/shop');
          } catch (err) {
            alert(err.message);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#0a0a0a"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response){
        alert("Payment failed! Please try again.");
      });
      paymentObject.open();

    } catch (err) {
      alert("Checkout failed: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'FIRST15') {
      setDiscountApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setDiscountApplied(false);
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
                <h2>3. PAYMENT</h2>
                <div className="upi-instructions">
                  <p>You will be securely redirected to <strong>Razorpay</strong> to complete your payment.</p>
                  <p style={{marginTop: '0.5rem', color: 'var(--text-secondary)'}}>We accept all major Credit/Debit Cards, UPI, and Netbanking.</p>
                </div>
              </section>

              <button type="submit" className="place-order-btn" disabled={submitting}>
                {submitting ? 'PROCESSING...' : 'PROCEED TO PAYMENT'}
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
                <p className="summary-price">₹{product.price}</p>
              </div>
            </div>
            <div className="promo-section">
              <div className="promo-input-group">
                <input 
                  type="text" 
                  placeholder="Gift card or discount code" 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  disabled={discountApplied}
                />
                <button 
                  type="button" 
                  onClick={handleApplyPromo}
                  disabled={discountApplied || !promoCode.trim()}
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="promo-error">{promoError}</p>}
              {discountApplied && <p className="promo-success">FIRST15 applied! (15% OFF)</p>}
            </div>

            <div className="summary-totals">
              <div className="total-row">
                <span>SUBTOTAL</span>
                <span>₹{product.price}</span>
              </div>
              {discountApplied && (
                <div className="total-row discount">
                  <span>DISCOUNT (FIRST15)</span>
                  <span>-₹{product.price - getFinalPrice()}</span>
                </div>
              )}
              <div className="total-row">
                <span>SHIPPING</span>
                <span>FREE</span>
              </div>
              <div className="total-row grand-total">
                <span>TOTAL</span>
                <span>₹{getFinalPrice()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;
