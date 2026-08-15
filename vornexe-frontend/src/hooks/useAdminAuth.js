import { useState, useEffect } from 'react';

// Mock hook for Claude to replace with actual authentication (e.g. JWT, Firebase, Supabase auth)
const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for a dummy token to simulate logged-in state
    const token = localStorage.getItem('vornexe_admin_token');
    if (token === 'valid_admin') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (password) => {
    setLoading(true);
    // Dummy check - Claude will replace with real API call
    if (password === 'admin123') { // Placeholder password
      localStorage.setItem('vornexe_admin_token', 'valid_admin');
      setIsAuthenticated(true);
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return { success: false, error: 'Invalid password' };
    }
  };

  const logout = () => {
    localStorage.removeItem('vornexe_admin_token');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout
  };
};

export default useAdminAuth;
