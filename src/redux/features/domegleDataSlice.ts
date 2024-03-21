import { createSlice } from "@reduxjs/toolkit";
import { createWeb3Modal, useWeb3Modal } from "@web3modal/wagmi/react";
import { config, projectId } from "../../service/web3model.conf";

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

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeMode: "light",
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
  ],
  allWallets: "ONLY_MOBILE",
});

const { open } = useWeb3Modal();
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
    walletConnect: () => {
      open();
    },
    walletDisconnect: () => {
      console.log("disconnect wallet event");
    },
  },
});

export default walletSlice.reducer;
export const { GuestEntry, walletConnect, walletDisconnect } =
  walletSlice.actions;
