import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('vornexe_admin_token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        
        if (!res.ok || !Array.isArray(data)) {
          throw new Error(data.error || 'Failed to fetch orders');
        }
        
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleMarkShipped = async (orderId) => {
    const trackingNumber = prompt("Enter Tracking Number:");
    if (trackingNumber === null) return;
    const trackingLink = prompt("Enter Tracking Link (optional):");
    
    try {
      const token = localStorage.getItem('vornexe_admin_token');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}/ship`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ trackingNumber, trackingLink })
      });
      if (res.ok) {
        alert("Order marked as shipped!");
        window.location.reload();
      } else {
        alert("Failed to update shipping");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading orders...</div>;
  }

  if (error) {
    return <div style={{ padding: '2rem', color: '#ff3333' }}>Error: {error}</div>;
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>ORDERS</h1>
      </div>
      
      {!Array.isArray(orders) || orders.length === 0 ? (
        <div style={{ 
          padding: '4rem', 
          textAlign: 'center', 
          border: '1px dashed var(--border-color)',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ letterSpacing: '0.1em' }}>NO ORDERS YET.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {orders.map(order => (
            <div key={order.id || order._id} style={{ 
              padding: '2rem', 
              backgroundColor: '#0a0a0a',
              border: `1px solid ${order.isShipped ? '#00C851' : 'var(--border-color)'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>ORDER #{(order.id || order._id || 'UNKNOWN').slice(0,8).toUpperCase()}</h3>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  border: `1px solid ${order.isShipped ? '#00C851' : 'var(--text-secondary)'}`, 
                  color: order.isShipped ? '#00C851' : 'var(--text-secondary)',
                  fontSize: '0.8rem'
                }}>
                  {order.isShipped ? 'SHIPPED' : (order.status || 'Pending')}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>CUSTOMER</p>
                  <p style={{ margin: 0 }}>{order.shippingDetails?.fullName || 'N/A'}</p>
                  <p style={{ margin: 0 }}>{order.shippingDetails?.email} | {order.shippingDetails?.phone}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>SHIPPING ADDRESS</p>
                  <p style={{ margin: 0 }}>{order.shippingDetails?.address || 'N/A'}</p>
                  <p style={{ margin: 0 }}>{order.shippingDetails?.city}, {order.shippingDetails?.state} {order.shippingDetails?.pinCode}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>PAYMENT ({order.paymentMethod ? order.paymentMethod.toUpperCase() : 'UPI'})</p>
                  <p style={{ margin: 0 }}>TXN ID: <strong>{order.transactionId || 'N/A'}</strong></p>
                  {order.discountCode && (
                    <p style={{ margin: '0.5rem 0 0 0', color: '#00C851' }}>
                      PROMO: <strong>{order.discountCode}</strong> (Paid: ₹{order.finalPrice})
                    </p>
                  )}
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>PRODUCT ID</p>
                  <p style={{ margin: 0 }}>{order.productId || 'N/A'}</p>
                </div>
                
                <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #222', paddingTop: '1rem', marginTop: '1rem' }}>
                  {order.isShipped ? (
                    <div>
                      <p style={{ color: '#00C851', marginBottom: '0.5rem' }}>✓ SHIPPED</p>
                      <p style={{ margin: 0 }}>Tracking: <strong>{order.trackingNumber}</strong></p>
                      {order.trackingLink && <a href={order.trackingLink} target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontSize: '0.9rem' }}>Track Link</a>}
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleMarkShipped(order.id || order._id)}
                      style={{ padding: '0.5rem 1rem', background: 'var(--text-primary)', color: 'var(--bg-color)', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)' }}
                    >
                      MARK AS SHIPPED
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
