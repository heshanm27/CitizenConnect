import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEmailVerified: false,
};
export const otpSlice = createSlice({
  name: "otp",
  initialState: initialState,
  reducers: {
      validOtp: (state) => { 
        state.isEmailVerified = true;
      },
      invalidateOtp: (state) => { 
        state.isEmailVerified = false;

      },

  },
});

export default otpSlice.reducer;
export const { validOtp,invalidateOtp} = otpSlice.actions;
