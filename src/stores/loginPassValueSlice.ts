import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginPassValueState {
  value: string;
}

const initialState: LoginPassValueState = {
  value: "",
};

const loginPassValueSlice = createSlice({
  name: "loginPassValue",
  initialState,
  reducers: {
    setLoginPassValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setLoginPassValue } = loginPassValueSlice.actions;
export default loginPassValueSlice.reducer;
