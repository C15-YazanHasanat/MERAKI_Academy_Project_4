import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    isLoggedIn: !localStorage.getItem("token") ? false : true,
  },
  reducers: {
    setLogin: (state, action) => {e
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload);
      console.log(action.payload);
      
    },
    setUserId: (stat, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
      console.log(action.payload);

    },
    setLogout: (state, action) => {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});
export const { setLogin, setUserId, setLogout } = authSlice.actions;
export default authSlice.reducer;
