// src/components/UserDashboard.js
import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const UserDashboard = () => {
    return (
        <Container>
            <Header as="h2">User Dashboard</Header>
            <p>Welcome to the User Dashboard. Here you can view your tasks and submissions.</p>
        </Container>
    );
};

export default UserDashboard;
