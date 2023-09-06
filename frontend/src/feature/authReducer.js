import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, role: "" },
  reducers: {
    login(state, role) {
      state.isLoggedIn = true;
      state.role = role;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.role = "";
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
