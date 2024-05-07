import { createSlice } from "@reduxjs/toolkit";
import { zeroAddress } from "viem";

const initialState = {
  userAuthenticated: false,
  enableSessionTime: true,
  authType: "",
  walletAddress: zeroAddress,
};

const AuthSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    guestLogin: (state) => {
      state.userAuthenticated = true;
      state.authType = "guest";
    },

    // walletLogin: (state, action) => {},

    // nftLogin: (state, action) => {},

    disconnect: (state) => {
      state.userAuthenticated = false;
      state.authType = "";
    },
  },
});

export default AuthSlice.reducer;
export const { guestLogin, disconnect } = AuthSlice.actions;
