import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
};
export const modeSlice = createSlice({
  name: "mode",
  initialState: initialState,
  reducers: {
    changeMode: (state, action) => {
      console.log("modeset", action.payload);
      state.mode = action.payload;
    },
  },
});

export default modeSlice.reducer;
export const { changeMode } = modeSlice.actions;
