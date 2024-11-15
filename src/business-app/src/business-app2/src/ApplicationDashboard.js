// src/ApplicationDashboard.js
import React, { useState } from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom'; // Import useHistory for navigation
import { loginUser } from './authUtils'; // Import your login function

const applications = [
    { id: 1, name: 'Application 1', description: 'Description for Application 1' },
    { id: 2, name: 'Application 2', description: 'Description for Application 2' },
    // Add more applications as needed
];

const ApplicationDashboard = () => {
    const history = Navigate(); // Hook to control navigation

    const handleLoginAndRedirect = (appId) => {
        // Simulate login process
        loginUser().then((isLoggedIn) => {
            if (isLoggedIn) {
                // Redirect to the specific application's landing page
                history(`/application/${appId}/landing`);
            }
        });
    };

    return (
        <div>
            <h1>Application Dashboard</h1>
            <Card.Group>
                {applications.map(app => (
                    <Card key={app.id}>
                        <Card.Content>
                            <Card.Header>{app.name}</Card.Header>
                            <Card.Description>{app.description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button onClick={() => handleLoginAndRedirect(app.id)}>
                                Go to {app.name}
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </div>
    );
};

export default ApplicationDashboard;
