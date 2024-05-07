import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.slice";

const domegleStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof domegleStore.getState>;
export type AppDispatch = typeof domegleStore.dispatch;
export default domegleStore;
