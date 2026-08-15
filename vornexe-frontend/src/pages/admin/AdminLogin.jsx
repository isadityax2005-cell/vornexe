import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';
import './AdminLogin.css';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <h1>VORNEXE <br/> ARCHIVE</h1>
        <p className="subtitle">AUTHORIZED ACCESS ONLY</p>
        
        <form onSubmit={handleSubmit} className="admin-login-form">
          <input
            type="password"
            placeholder="ENTER ACCESS CODE"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            autoFocus
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'VERIFYING...' : 'ENTER'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
