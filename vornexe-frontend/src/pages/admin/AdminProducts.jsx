import React, { useState } from 'react';
import useProducts from '../../hooks/useProducts';
import ProductForm from '../../components/admin/ProductForm';

const AdminProducts = () => {
  const { products, loading, addProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = async (data) => {
    const result = await addProduct(data);
    if (result.success) {
      setShowForm(false);
    } else {
      alert("Failed to add product: " + result.error);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>PRODUCTS</h1>
        {!showForm && (
          <button className="admin-primary-btn" onClick={() => setShowForm(true)}>
            + NEW PIECE
          </button>
        )}
      </div>

      {showForm ? (
        <div>
          <button 
            onClick={() => setShowForm(false)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-secondary)', 
              cursor: 'pointer',
              marginBottom: '2rem',
              fontFamily: 'var(--font-primary)'
            }}
          >
            ← BACK TO LIST
          </button>
          <ProductForm onSubmit={handleAddProduct} />
        </div>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {products.map(product => (
            <div key={product.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '1rem 2rem', 
              backgroundColor: '#0a0a0a',
              border: '1px solid var(--border-color)',
              gap: '2rem'
            }}>
              <img src={product.imageUrl} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', lineHeight: 1 }}>{product.name}</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Size: {product.size} | Price: ${product.price}</span>
              </div>
              <div style={{ 
                padding: '0.25rem 0.75rem', 
                border: '1px solid var(--border-color)', 
                color: product.isSoldOut ? 'var(--text-secondary)' : '#00ff00',
                fontSize: '0.8rem',
                letterSpacing: '0.1em'
              }}>
                {product.isSoldOut ? 'SOLD OUT' : 'AVAILABLE'}
              </div>
              <button style={{ 
                background: 'transparent', 
                border: '1px solid var(--border-color)', 
                color: 'var(--text-primary)',
                padding: '0.5rem 1rem',
                cursor: 'pointer'
              }}>
                EDIT
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
