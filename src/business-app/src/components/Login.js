import React, { useState } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';
import { mockApi } from '../services/mockApi';
import { useNavigate } from 'react-router-dom';
import { mockAuth } from '../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e) => {
      e.preventDefault();

      
      // Attempt to log in the user
      const isLoggedIn = mockAuth.login({ username, password });

      console.log('i am here at login page', isLoggedIn);
      if (isLoggedIn.loggedIn) {
          // Redirect to the business app dashboard
          navigate(`/${isLoggedIn.user.businessEntityName}`); // Redirect to the relevant path
      } else {
          // Show error if authentication fails
          setError('invalid login');
      }
  };

  return (
    <Form>
      {error && <Message negative>{error}</Message>}
      <Form.Field>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Field>
      <Button type="button" primary onClick={handleLogin}>Login</Button>
    </Form>
  );
};

export default Login;
