// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { mockAuth } from '../utils/auth'; // Import the mockAuth

const ProtectedRoute = ({ element: Element }) => {
  return mockAuth.isAuthenticated() ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
