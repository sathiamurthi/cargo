// authUtils.js
// Mock user credentials for demonstration
const mockUserCredentials = {
    username: 'user',
    password: 'password',
};
export const isTokenValid = () => {
    const token = localStorage.getItem('token');
    const expiry = localStorage.getItem('tokenExpiry');

    if (!token || !expiry) return false;
    return new Date().getTime() < expiry; // Check if the current time is less than the expiry time
};
// src/authUtils.js



export const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        // Simulate an API call for user login
        setTimeout(() => {
            if (username === mockUserCredentials.username && password === mockUserCredentials.password) {
                resolve(true); // Login successful
            } else {
                resolve(false); // Login failed
            }
        }, 1000); // Simulate network delay
    });
};