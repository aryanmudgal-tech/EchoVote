import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function ProtectedRoute({ children }) {
  const [authUser] = useAuth();

  if (!authUser) {
    return <Navigate to="/signup" replace />;
  }

  return children;
}

export default ProtectedRoute; 