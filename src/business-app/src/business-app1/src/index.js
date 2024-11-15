import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import PegionConectApp from './App';
import { UserProvider } from './UserContext'; // Adjust the path as needed

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <UserProvider>
            <PegionConectApp />
        </UserProvider>
    </BrowserRouter>
);
