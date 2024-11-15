// src/components/ProtectedLogin.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockAuth } from '../utils/auth'; // Import the mockAuth
import Login from './Login'; // Import the existing Login component
import LandingPage from './LandingPage';

const ProtectedLogin = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location of the user

  // Check if the user is authenticated when this component is mounted
  useEffect(() => {
    console.log('i am here')
    if (mockAuth.isAuthenticated()) {
      // Redirect to the appropriate business app if logged in
      navigate('/business-app1'); // Or adjust this based on your app logic
    }
  }, [navigate]);
  console.log('i am here',mockAuth.isAuthenticated())

   // If the user is authenticated but on the login or landing page, redirect
   if (location.pathname === '/login') {
    return <Login />;
  }
  // If the user is on the login page or landing page and not authenticated,
  // return the Login component for user to input credentials.
  if (!mockAuth.isAuthenticated()) {
    // The user is not authenticated, so show the Login page
    return <Login />;
  }
 

};

export default ProtectedLogin;
