import React, { createContext, useContext, useState } from 'react';

// Mocked data representing users in the database
const businessEntityUsers = [
    { email: 'manager@example.com', password: 'password', role: 'manager' },
    { email: 'user@example.com', password: 'userpass', role: 'user' },
    { email: 'admin@example.com', password: 'adminpass', role: 'admin' } // Another example role
];

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const login = async (email, password) => {
        // Find the user in the mocked business entity list
        const matchedUser = businessEntityUsers.find(user => user.email === email && user.password === password);
        if (matchedUser) {
            setIsAuthenticated(true);
            setUserRole(matchedUser.role); // Set the user role
            return true;
        }
        return false;
    };

    return (
        <UserContext.Provider value={{ isAuthenticated, userRole, login }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
