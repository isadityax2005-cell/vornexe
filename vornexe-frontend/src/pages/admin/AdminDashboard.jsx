import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <div className="admin-page-header">
        <h1>DASHBOARD</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
        <div style={{ padding: '2rem', border: '1px solid var(--border-color)', backgroundColor: '#0a0a0a' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>TOTAL ARCHIVE</p>
          <h2 style={{ fontSize: '4rem', margin: 0, lineHeight: 0.9 }}>12</h2>
        </div>
        <div style={{ padding: '2rem', border: '1px solid var(--border-color)', backgroundColor: '#0a0a0a' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>SOLD OUT</p>
          <h2 style={{ fontSize: '4rem', margin: 0, lineHeight: 0.9 }}>8</h2>
        </div>
        <div style={{ padding: '2rem', border: '1px solid var(--border-color)', backgroundColor: '#0a0a0a' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>AVAILABLE</p>
          <h2 style={{ fontSize: '4rem', margin: 0, lineHeight: 0.9 }}>4</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
