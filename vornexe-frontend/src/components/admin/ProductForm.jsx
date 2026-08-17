import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || '',
    size: initialData?.size || '',
    imageUrl: initialData?.imageUrl || '',
    isSoldOut: initialData?.isSoldOut || false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="admin-product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>PIECE NAME</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          placeholder="e.g. Distressed Hoodie" 
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>PRICE (INR)</label>
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            required 
            min="0"
          />
        </div>
        <div className="form-group">
          <label>SIZE (1-OF-1)</label>
          <input 
            type="text" 
            name="size" 
            value={formData.size} 
            onChange={handleChange} 
            required 
            placeholder="e.g. L"
          />
        </div>
      </div>

      <div className="form-group">
        <label>DESCRIPTION</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          rows="4" 
          placeholder="Details about this unique piece..."
        />
      </div>

      <div className="form-group">
        <label>IMAGE UPLOAD</label>
        <input 
          type="file" 
          name="image"
          accept="image/*"
          onChange={(e) => {
            setFormData(prev => ({
              ...prev,
              imageFile: e.target.files[0]
            }));
          }}
          required={!initialData} 
        />
        <p className="form-help">Upload a photo from your computer. It will be saved securely to the backend.</p>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input 
            type="checkbox" 
            name="isSoldOut" 
            checked={formData.isSoldOut} 
            onChange={handleChange} 
          />
          MARK AS SOLD OUT
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="admin-secondary-btn">CANCEL</button>
        <button type="submit" className="admin-primary-btn">
          {initialData ? 'UPDATE PIECE' : 'ADD TO ARCHIVE'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
