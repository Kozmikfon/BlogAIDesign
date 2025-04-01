import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('admin-auth') === 'true';

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
