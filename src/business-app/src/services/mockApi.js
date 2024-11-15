let users = []; // This will act as a mock database

export const mockApi = {
  login: (username, password) => {
    // Simulate a login
    const user = users.find(user => user.username === username && user.password === password);
    return new Promise((resolve, reject) => {
      if (user) {
        resolve(user);
      } else {
        reject('Invalid credentials');
      }
    });
  },

  register: (userData) => {
    // Simulate registration
    users.push(userData);
    return Promise.resolve(userData);
  },

  getUsers: () => {
    // Simulate getting all users
    return Promise.resolve(users);
  },

  deleteUser: (username) => {
    // Simulate deleting a user
    users = users.filter(user => user.username !== username);
    return Promise.resolve(users);
  },
};
