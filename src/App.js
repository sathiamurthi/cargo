import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Container, Menu, Image, Button, Icon, Dropdown, Sidebar } from 'semantic-ui-react';
import DriversManagement from './DriversManagement';
import Dashboard from './Dashboard';
import AddDriver from './AddDriver';
import ShipmentComponent from './ShipmentComponent';
import CreateShipment from './CreateShipment';
import RoutePlanning from './RoutePlanning';
import Reports from './Reports';
import LoginComponent from './LoginComponent'; // Import the LoginComponent
import { mockBusinessEntities } from './mockData'; // Import the mock data
import { isTokenValid } from './authUtils'; // Import the validation function

const App = () => {
    const [visible, setVisible] = useState(false);
    const [businessEntity, setBusinessEntity] = useState(null); // Initialize state for business entity

    const handleMenuItemClick = () => {
        setVisible(false);
    };

    const toggleMenu = () => setVisible(!visible);

    return (
        <Router>
            <Container>
                <Menu fixed='top' style={{ marginBottom: '0' }} inverted>
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Image avatar src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                            {businessEntity ? businessEntity.name : "Guest"}
                        </Menu.Item>
                        <Menu.Item>
                            <Button icon onClick={toggleMenu}>
                                <Icon name={visible ? 'angle up' : 'angle down'} />
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Sidebar
                    as={Menu}
                    animation='push'
                    inverted
                    onHide={() => setVisible(false)}
                    vertical
                    visible={visible}
                    width='thin'
                >
                    <Menu.Item as={Link} to="/dashboard" name='home' onClick={handleMenuItemClick}>
                        Home
                    </Menu.Item>
                    <Menu.Item as={Link} to="/drivers" name='drivers' onClick={handleMenuItemClick}>
                        Drivers
                    </Menu.Item>
                    <Menu.Item as={Link} to="/adddriver" name='add driver' onClick={handleMenuItemClick}>Add Driver</Menu.Item>
                    <Menu.Item as={Link} to="/shipments" name='shipments' onClick={handleMenuItemClick}>Shipments</Menu.Item>
                    <Menu.Item as={Link} to="/createshipment" name='create shipment' onClick={handleMenuItemClick}>Create Shipment</Menu.Item>
                    <Menu.Item as={Link} to="/routeplanning" name='route planning' onClick={handleMenuItemClick}>Route Planning</Menu.Item>
                    <Menu.Item as={Link} to="/reports" name='reports' onClick={handleMenuItemClick}>Reports</Menu.Item>
                    <Menu.Item name='pricing' onClick={handleMenuItemClick}>Pricing</Menu.Item>
                </Sidebar>

                {/* Main content area */}
                <div style={{ flex: 1, padding: '20px', marginTop: '56px' }}>
                    <Routes>
                        <Route path="/" element={<LoginComponent setBusinessEntity={setBusinessEntity} />} />
                        <Route path="/dashboard" element={
                            isTokenValid() ? (
                                <Dashboard businessEntity={businessEntity} />
                            ) : (
                                <Navigate to="/" replace /> // Redirect to login if not authenticated
                            )
                        } />
                        <Route path="/drivers" element={<DriversManagement />} />
                        <Route path="/adddriver" element={<AddDriver />} />
                        <Route path="/shipments" element={<ShipmentComponent />} />
                        <Route path="/createshipment" element={<CreateShipment />} />
                        <Route path="/routeplanning" element={<RoutePlanning />} />
                        <Route path="/reports" element={<Reports />} />
                    </Routes>
                </div>
            </Container>
        </Router>
    );
};

export default App;
