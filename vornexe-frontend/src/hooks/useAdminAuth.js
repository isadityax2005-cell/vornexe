import { useState, useEffect } from 'react';

const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for the JWT token
    const token = localStorage.getItem('vornexe_admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (password) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('vornexe_admin_token', data.token);
        setIsAuthenticated(true);
        setLoading(false);
        return { success: true };
      } else {
        const data = await response.json();
        setLoading(false);
        return { success: false, error: data.error || 'Invalid password' };
      }
    } catch (error) {
      setLoading(false);
      return { success: false, error: 'Server error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('vornexe_admin_token');
    setIsAuthenticated(false);
  };

  const getToken = () => {
    return localStorage.getItem('vornexe_admin_token');
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
    getToken
  };
};

export default useAdminAuth;
