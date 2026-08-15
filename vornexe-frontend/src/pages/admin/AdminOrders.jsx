import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="admin-page-header">
        <h1>ORDERS</h1>
      </div>
      
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
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
            <div key={order.id} style={{ 
              padding: '2rem', 
              backgroundColor: '#0a0a0a',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>ORDER #{order.id.slice(0,8).toUpperCase()}</h3>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  border: '1px solid var(--text-secondary)', 
                  color: 'var(--text-secondary)',
                  fontSize: '0.8rem'
                }}>
                  {order.status}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>CUSTOMER</p>
                  <p style={{ margin: 0 }}>{order.shippingDetails.fullName}</p>
                  <p style={{ margin: 0 }}>{order.shippingDetails.email} | {order.shippingDetails.phone}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>SHIPPING ADDRESS</p>
                  <p style={{ margin: 0 }}>{order.shippingDetails.address}</p>
                  <p style={{ margin: 0 }}>{order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.pinCode}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>PAYMENT (UPI)</p>
                  <p style={{ margin: 0 }}>TXN ID: <strong>{order.transactionId}</strong></p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>PRODUCT ID</p>
                  <p style={{ margin: 0 }}>{order.productId}</p>
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
