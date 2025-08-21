import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    userName: localStorage.getItem("userName") || null,
    isLoggedIn: !localStorage.getItem("token") ? false : true,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    setLogout: (state, action) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("userName", action.payload);
    },
  },
});
export const { setLogin, setUserId, setLogout, setUserName } =
  authSlice.actions;
export default authSlice.reducer;
