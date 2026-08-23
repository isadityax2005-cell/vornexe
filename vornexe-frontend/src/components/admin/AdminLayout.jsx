import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';
import './AdminLayout.css';

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>VORNEXE</h2>
          <span>ARCHIVE SYSTEM</span>
        </div>
        
        <nav className="admin-nav">
          <Link to="/admin" className={pathname === '/admin' ? 'active' : ''}>
            DASHBOARD
          </Link>
          <Link to="/admin/products" className={pathname.includes('/admin/products') ? 'active' : ''}>
            PRODUCTS
          </Link>
          <Link to="/admin/orders" className={pathname.includes('/admin/orders') ? 'active' : ''}>
            ORDERS
          </Link>
          <Link to="/admin/messages" className={pathname.includes('/admin/messages') ? 'active' : ''}>
            INQUIRIES
          </Link>
        </nav>

        <div className="admin-footer">
          <button onClick={handleLogout} className="logout-btn">
            LOG OUT
          </button>
        </div>
      </aside>
      
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
