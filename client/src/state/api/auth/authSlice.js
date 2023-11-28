import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: undefined,
  userInfo: undefined,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    addUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    }
  },
});

export const { setToken, addUserInfo, setUserAuthenticated } = authSlice.actions;
export default authSlice.reducer;
