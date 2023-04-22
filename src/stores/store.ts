import { configureStore } from "@reduxjs/toolkit";
import loginPassValueSlice from "./loginPassValueSlice";

const store = configureStore({
  reducer: {
    loginPassValue: loginPassValueSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
