import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refresh, logout } from '../features/user/userSlice';
import { mockApi } from '../services/mockApi';
import { useNavigate } from 'react-router-dom';

const RefreshComponent = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { token, expiry } = useSelector(state => state.user);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!token || !expiry) return;

      const now = Date.now();
      if (now >= expiry) {
        clearInterval(interval);
        alert('Session expired, redirecting to login.');
        dispatch(logout());
        history('/login');
      } else if (now >= expiry - 10000) { // Refresh 10 seconds before expiry
        mockApi.refreshToken(token)
          .then(({ token, expiry }) => {
            dispatch(refresh({ token, expiry }));
            alert('Session refreshed.');
          })
          .catch(() => {
            clearInterval(interval);
            dispatch(logout());
            history('/login');
          });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [token, expiry, dispatch, history]);

  return null;
};

export default RefreshComponent;
