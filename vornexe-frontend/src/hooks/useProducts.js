import { useState, useEffect } from 'react';

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}?t=${Date.now()}`);
      if (!res.ok) throw new Error('Failed to fetch archive');
      const data = await res.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (formDataObj) => {
    try {
      const data = new FormData();
      data.append('name', formDataObj.name);
      data.append('description', formDataObj.description);
      data.append('price', formDataObj.price);
      data.append('size', formDataObj.size);
      data.append('isSoldOut', formDataObj.isSoldOut);
      if (formDataObj.imageFiles && formDataObj.imageFiles.length > 0) {
        formDataObj.imageFiles.forEach(file => {
          data.append('images', file);
        });
      }

      const token = localStorage.getItem('vornexe_admin_token');
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });
      
      if (!res.ok) throw new Error('Failed to add product');
      await fetchProducts(); // Refresh list
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  };

  const updateProduct = async (id, formDataObj) => {
    try {
      const data = new FormData();
      data.append('name', formDataObj.name);
      data.append('description', formDataObj.description);
      data.append('price', formDataObj.price);
      data.append('size', formDataObj.size);
      data.append('isSoldOut', formDataObj.isSoldOut);
      if (formDataObj.imageFiles && formDataObj.imageFiles.length > 0) {
        formDataObj.imageFiles.forEach(file => {
          data.append('images', file);
        });
      }

      const token = localStorage.getItem('vornexe_admin_token');
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });
      
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to update product: ${res.status} ${errText}`);
      }
      await fetchProducts();
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    refresh: fetchProducts
  };
};

export default useProducts;
