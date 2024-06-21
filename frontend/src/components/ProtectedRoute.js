import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  console.log('isAuthenticated:', isAuthenticated); // Log the isAuthenticated value

  if (!isAuthenticated) {
    console.log('Unauthorized access attempted'); // Log a message when unauthorized access is detected
    // toast.error("You need to be signed in to access this page.");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;