import { createSlice } from "@reduxjs/toolkit";

interface walletData {
  address?: string;
  chainId?: string;
  isStacked?: boolean;
}

interface domegleAccountData {
  requireStakeAmount?: string;
  wallet?: walletData;
  authenticationType?: string;
  socketId?: string;
  peerSocketId?: string;
}

const initialState: domegleAccountData = {};

// const { data } = useReadStakingGetMinimumStakeAmount();

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setStakeAmount: (state, action) => {
      state.requireStakeAmount = action.payload.stackAmount;
    },
    userEntry: (state, action) => {
      state.authenticationType = action.payload.type;
      state.wallet = {
        address: action.payload.address,
        chainId: action.payload.chainId,
      };
    },
    stakeStack: (state, action) => {
      state.wallet!.isStacked = action.payload;
    },
    sessionData: (state, action) => {
      state.socketId = action.payload.socketId;
      state.peerSocketId = action.payload.peerId;
    },
  },
});

export default walletSlice.reducer;
export const { setStakeAmount, userEntry, stakeStack, sessionData } =
  walletSlice.actions;
