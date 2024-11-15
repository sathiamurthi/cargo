import React, { useState } from 'react';
import { Form, Segment, Button, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Adjust the import path as needed
import './LoginPage.css'; // Import custom CSS for additional styling

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, userRole } = useUser(); // Get user role from context
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const authenticated = await login(email, password);
        if (authenticated) {
            // Redirect based on user role
            if (userRole === 'manager') {
                navigate('/manager'); // Redirect to manager dashboard
            } else if (userRole === 'user') {
                navigate('/user'); // Redirect to user dashboard
            } else if (userRole === 'admin') {
                navigate('/admin'); // Redirect to admin dashboard
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <Icon name="user circle" size="huge" />
                </div>
                <Form onSubmit={handleLogin}>
                    <Segment stacked>
                        <Form.Input
                            icon="user"
                            iconPosition="left"
                            placeholder="Your email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Form.Input
                            icon="lock"
                            iconPosition="left"
                            placeholder="Your password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button fluid color="teal" type="submit">Login</Button>
                    </Segment>
                </Form>
                <div className="register-link">
                    <span onClick={() => navigate('/register')}>Register</span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
