// src/components/Sidebar.jsx
import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Menu vertical fluid style={{ width: '250px', height: '100vh', position: 'fixed', left: 0 }}>
            <Menu.Item
                name='dashboard'
                onClick={() => navigate('/dashboard')}
            >
                <Icon name='dashboard' /> Dashboard
            </Menu.Item>

            <Menu.Item
                name='employees'
                onClick={() => navigate('/employees')}
            >
                <Icon name='users' /> Employees
            </Menu.Item>

            <Menu.Item
                name='allocations'
                onClick={() => navigate('/allocations')}
            >
                <Icon name='tasks' /> Allocations
            </Menu.Item>

            <Menu.Item
                name='settings'
                onClick={() => navigate('/settings')}
            >
                <Icon name='settings' /> Settings
            </Menu.Item>
            <Menu.Item
                name='leader'
                onClick={() => navigate('/leader')}
            >
                <Icon name='leader' /> Leader Dashboard
            </Menu.Item>
            {/* Add more menu items as needed */}
        </Menu>
    );
};

export default Sidebar;
