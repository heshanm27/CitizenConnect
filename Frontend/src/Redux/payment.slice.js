import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    CertificateOrderID: "",
};
export const paymentSlice = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {
      orderSave: (state,action) => { 
          state.CertificateOrderID = action.payload;
      },
      deleteOrder: (state) => { 
        state.CertificateOrderID = "";
      },
  },
});

export default paymentSlice.reducer;
export const { orderSave,deleteOrder} = paymentSlice.actions;
