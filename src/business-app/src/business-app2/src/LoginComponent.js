// LoginComponent.js
import React, { useState } from 'react';
import { Form, Button, Dropdown, Message } from 'semantic-ui-react';
import { mockBusinessEntities } from './mockData'; // Import the mock data
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const LoginComponent = ({ setBusinessEntity }) => {
    const [selectedEntity, setSelectedEntity] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Create a navigate instance

    const businessEntityOptions = mockBusinessEntities.map(entity => ({
        key: entity.id,
        text: entity.name,
        value: entity.name,
    }));

    const handleLogin = () => {
        const entity = mockBusinessEntities.find(entity => entity.name === selectedEntity);
    
        if (entity && entity.loginCredentials.username === username && entity.loginCredentials.password === password) {
            const token = 'mock_token'; // Generate a mock token
            const expiryTime = new Date().getTime() + 60 * 60 * 1000; // Token valid for 1 hour (60 minutes)
    
            localStorage.setItem('token', token); // Store token
            localStorage.setItem('tokenExpiry', expiryTime); // Store expiration time
            setBusinessEntity(entity); // Set the business entity
            setErrorMessage('');
            navigate('/dashboard'); // Redirect to dashboard
        } else {
            setErrorMessage('Invalid credentials. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Login</h2>
            {errorMessage && <Message negative>{errorMessage}</Message>}
            
            <Form>
                <Dropdown
                    placeholder='Select Business Entity'
                    options={businessEntityOptions}
                    onChange={(e, { value }) => setSelectedEntity(value)}
                    selection
                    required
                />
                <Form.Input
                    label='Username'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Form.Input
                    label='Password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button primary onClick={handleLogin}>Login</Button>
            </Form>
        </div>
    );
};

export default LoginComponent;
