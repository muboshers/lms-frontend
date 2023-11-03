import { createSlice } from "@reduxjs/toolkit";

import { authApiReq } from "src/api/auth-api-req";

const initialState = {
  teaching_center: null,
  token: null,
  isAuthenticated: false,
};

export const authReducerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.teaching_center = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    login: (state, { payload }) => {
      state.teaching_center = payload?.teaching_center;
      state.token = payload?.token;
      state.isAuthenticated = true;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApiReq.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem("user", JSON.stringify(payload));
        state.teaching_center = payload?.data.teaching_center;
        state.token = payload.data.token;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApiReq.endpoints.getMeInfo.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem("user", JSON.stringify(payload));
        state.teaching_center = payload?.data.teaching_center;
        state.token = payload.data.token;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApiReq.endpoints.getMeInfo.matchRejected,
      (state) => {
        localStorage.removeItem("user");
        state.teaching_center = null;
        state.token = null;
        state.isAuthenticated = false;
      }
    );
  },
});

export const { logOut, login } = authReducerSlice.actions;

const authReducer = authReducerSlice.reducer;

export const SelectTeachingCenter = (state) =>
  state.teachingCenter.teaching_center;

export const SelectIsAuthenticated = (state) =>
  state.teachingCenter.isAuthenticated;

export const SelectToken = (state) => state.teachingCenter.token;

export default authReducer;
