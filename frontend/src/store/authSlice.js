import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    role: null,
    userId: null,
    fullName: null,
    avatar: null,
    isDemo: false
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.fullName = action.payload.fullName;
      state.avatar = action.payload.avatar;
      state.userId = action.payload._id;
      state.role = action.payload.role
      state.isDemo = action.payload.isDemo || false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.fullName = null;
      state.avatar = null;
      state.role = null;
      state.userId = null;
      state.isDemo = false
    },

    updateAvatar(state, action) {
      state.avatar = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;