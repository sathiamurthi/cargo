import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App'; // Your main application component to display after login
import LoginComponent from './LoginComponent';

const LandingPage = () => {
    const [businessEntity, setBusinessEntity] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/login" exact>
                    <LoginComponent setBusinessEntity={setBusinessEntity} />
                </Route>
                <Route path="/dashboard">
                    <App businessEntity={businessEntity} />
                </Route>
            </Routes>
        </Router>
    );
};

export default LandingPage;
