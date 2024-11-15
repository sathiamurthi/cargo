// src/utils/auth.js

const registeredUsers = [
    { id: 1, username: 'user1', password: 'password1', businessEntityName: 'business-app1' },
    { id: 2, username: 'user2', password: 'password2', businessEntityName: 'business-app2' },
    { id: 3, username: 'user3', password: 'password3', businessEntityName: 'Entity C' }
];

export const mockAuth = {
    user: null,

    login(userData) {
        // Validate the user against registered business entity users
        const user = registeredUsers.find(user => user.username === userData.username && user.password === userData.password);
      console.log('user',user)
        if (user) {
            this.user = user; // Store user data
            localStorage.setItem('authToken', 'dummyToken'); // Simulating a token
            user.loggedIn = true;
            return {user:user,loggedIn:true}; // Successful login
        } else {
            return {user:user,loggedIn:false}; // Invalid credentials
        }
    },

    logout() {
        this.user = null; // Clear user data
        localStorage.removeItem('authToken'); // Remove token from storage
    },

    isAuthenticated() {
      const token = localStorage.getItem('authToken');
      console.log('Authenticated user data:', this.user, token);
      return token !== null && token.trim() !== ''; // Check if token is not null and not an empty string
  },

    getUser() {
        return this.user; // Returns the logged-in user data
    }
};
