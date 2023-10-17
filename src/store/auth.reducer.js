import { createSlice } from '@reduxjs/toolkit';

import { authApiReq } from 'src/api/auth-api-req';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};
export const authReducerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    login: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(authApiReq.endpoints.login.matchFulfilled, (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload));
      state.user = payload?.user;
      state.token = payload?.token;
      state.isAuthenticated = Boolean(payload?.user);
    });
    builder.addMatcher(authApiReq.endpoints.getMeInfo.matchFulfilled, (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload));
      state.user = payload?.user;
      state.token = payload?.token;
      state.isAuthenticated = Boolean(payload?.user);
    });

    builder.addMatcher(authApiReq.endpoints.getMeInfo.matchRejected, (state) => {
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
  },
});

export const { logOut, login } = authReducerSlice.actions;

const authReducer = authReducerSlice.reducer;

export default authReducer;
