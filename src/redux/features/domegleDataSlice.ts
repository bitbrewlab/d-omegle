import { createSlice } from "@reduxjs/toolkit";

interface walletData {
  address?: string;
  chainId?: string;
}

interface domegleAccountData {
  wallet?: walletData;
  authenticationType?: string;
  socketId?: string;
  peerId?: string;
}

const initialState: domegleAccountData = {};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    GuestEntry: (state) => {
      state.authenticationType = "guest";
      state.wallet = {
        address: "0x0",
        chainId: "None",
      };
    },
    walletConnect: () => {},
    walletDisconnect: () => {
      console.log("disconnect wallet event");
    },
  },
});

export default walletSlice.reducer;
export const { GuestEntry, walletConnect, walletDisconnect } =
  walletSlice.actions;
