import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  currentUser: null,
  token: null,
  expiry: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.push(action.payload);
    },
    login(state, action) {
      const { user, token, expiry } = action.payload;
      state.currentUser = user;
      state.token = token;
      state.expiry = expiry;
    },
    logout(state) {
      state.currentUser = null;
      state.token = null;
      state.expiry = null;
    },
    refresh(state, action) {
      const { token, expiry } = action.payload;
      state.token = token;
      state.expiry = expiry;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const { addUser, login, logout, setUsers, refresh } = userSlice.actions;
export default userSlice.reducer;
