import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: undefined,
  userInfo: undefined,
  registeredEmail: undefined
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    addUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    userRegisteredEmail: (state, action) => {
      state.registeredEmail = action.payload;
    },
  },
});

export const { userLoggedIn, addUserInfo, userRegisteredEmail } = authSlice.actions;
export default authSlice.reducer;
