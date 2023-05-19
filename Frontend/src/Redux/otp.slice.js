import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEmailVerified: false,
    email: "",
};
export const otpSlice = createSlice({
  name: "otp",
  initialState: initialState,
  reducers: {
      validOtp: (state, action) => { 
        state.isEmailVerified = true;
        state.email = action.payload.email;
      },
      invalidOtp: (state) => { 
        state.isEmailVerified = false;
        state.email = "";
      },

  },
});

export default otpSlice.reducer;
export const { validOtp,invalidOtp} = otpSlice.actions;
