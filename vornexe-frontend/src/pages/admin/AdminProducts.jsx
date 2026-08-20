import React, { useState } from 'react';
import useProducts from '../../hooks/useProducts';
import ProductForm from '../../components/admin/ProductForm';

const AdminProducts = () => {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = async (data) => {
    let result;
    if (editingProduct) {
      result = await updateProduct(editingProduct.id, data);
    } else {
      result = await addProduct(data);
    }
    
    if (result.success) {
      setShowForm(false);
      setEditingProduct(null);
    } else {
      alert("Failed to save product: " + result.error);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this piece?')) {
      const result = await deleteProduct(id);
      if (!result.success) {
        alert("Failed to delete product: " + result.error);
      }
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>PRODUCTS</h1>
        {!showForm && (
          <button className="admin-primary-btn" onClick={() => { setEditingProduct(null); setShowForm(true); }}>
            + NEW PIECE
          </button>
        )}
      </div>

      {showForm ? (
        <div>
          <button 
            onClick={handleCancel}
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
          <ProductForm 
            key={editingProduct ? editingProduct.id : 'new'} 
            initialData={editingProduct} 
            onSubmit={handleAddProduct} 
            onCancel={handleCancel}
          />
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
              {product.imageUrls && product.imageUrls.length > 0 && (
                <img src={product.imageUrls[0]} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
              )}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', lineHeight: 1 }}>{product.name}</h3>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Size: {product.size} | Price: ₹{product.price}</span>
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
              <button 
                onClick={() => handleEditClick(product)}
                style={{ 
                background: 'transparent', 
                border: '1px solid var(--border-color)', 
                color: 'var(--text-primary)',
                padding: '0.5rem 1rem',
                cursor: 'pointer'
              }}>
                EDIT
              </button>
              <button 
                onClick={() => handleDelete(product.id)}
                style={{ 
                background: 'transparent', 
                border: '1px solid #ff4444', 
                color: '#ff4444',
                padding: '0.5rem 1rem',
                cursor: 'pointer'
              }}>
                DELETE
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
