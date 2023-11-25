import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: undefined,
  userInfo: undefined
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
  },
});

export const { userLoggedIn, addUserInfo } = authSlice.actions;
export default authSlice.reducer;
