
  let users = []; // Simulate a user database

export const mockApi = {
  updateUser: (userData) => {
    users = users.map(user => (user.username === userData.username ? userData : user));
    return Promise.resolve(userData);
  },

  getUser: (username) => {
    const user = users.find(u => u.username === username);
    return Promise.resolve(user);
  },
  login: (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
    return new Promise((resolve, reject) => {
      if (user) {
        const token = 'fake-jwt-token'; // Simulating a JWT token
        const expiry = Date.now() + 60000; // Token expires in 60 seconds
        resolve({ user, token, expiry });
      } else {
        reject('Invalid credentials');
      }
    });
  },

  register: (userData) => {
    users.push(userData);
    return Promise.resolve(userData);
  },

  refreshToken: (token) => {
    return new Promise((resolve, reject) => {
      if (token === 'fake-jwt-token') {
        const newExpiry = Date.now() + 60000; // Extend expiry by 60 seconds
        resolve({ token, expiry: newExpiry });
      } else {
        reject('Invalid token');
      }
    });
  }
};
