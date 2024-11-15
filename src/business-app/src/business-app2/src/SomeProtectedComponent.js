import React, { useEffect, useState } from 'react';
import { isTokenValid } from './authUtils'; // Import the validation function
import { Modal, Button } from 'semantic-ui-react';

const SomeProtectedComponent = () => {
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        if (!isTokenValid()) {
            setIsExpired(true); // Set expired state to true
        }
    }, []);

    const handleRefresh = () => {
        localStorage.removeItem('token'); // Clear the expired token
        localStorage.removeItem('tokenExpiry'); // Clear the expired time
        // Optionally, redirect to the login page or refresh the page
        window.location.reload(); // Refresh the page or you can navigate to login directly
    };

    return (
        <div>
            {isExpired && (
                <Modal open={true} onClose={() => setIsExpired(false)}>
                    <Modal.Header>Session Expired</Modal.Header>
                    <Modal.Content>
                        <p>Your session has expired. Would you like to refresh and continue?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={handleRefresh} primary>Refresh</Button>
                        <Button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }} negative>Logout</Button>
                    </Modal.Actions>
                </Modal>
            )}
            {/* Your component content goes here */}
        </div>
    );
};

export default SomeProtectedComponent;
