import React from 'react';
import useProducts from '../../hooks/useProducts';

const AdminDashboard = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;
  }

  const totalProducts = products.length;
  const soldOut = products.filter(p => p.isSoldOut).length;
  const available = totalProducts - soldOut;
  
  // Calculate total revenue from sold out products
  const totalRevenue = products
    .filter(p => p.isSoldOut)
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <div>
      <div className="admin-page-header">
        <h1>DASHBOARD</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
        <div style={{ padding: '2rem', border: '1px solid var(--border-color)', backgroundColor: '#0a0a0a' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>TOTAL ARCHIVE</p>
          <h2 style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>{totalProducts}</h2>
        </div>
        <div style={{ padding: '2rem', border: '1px solid var(--border-color)', backgroundColor: '#0a0a0a' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>SOLD OUT</p>
          <h2 style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>{soldOut}</h2>
        </div>
        <div style={{ padding: '2rem', border: '1px solid var(--border-color)', backgroundColor: '#0a0a0a' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>AVAILABLE</p>
          <h2 style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>{available}</h2>
        </div>
        <div style={{ padding: '2rem', border: '1px solid var(--border-color)', backgroundColor: '#0a0a0a' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>REVENUE</p>
          <h2 style={{ fontSize: '3rem', margin: 0, lineHeight: 1 }}>₹{totalRevenue.toLocaleString('en-IN')}</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
