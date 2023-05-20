import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./auth.slice.js";
import { modeSlice } from "./darkMode.slice.js";
import { otpSlice } from "./otp.slice.js";
import { paymentSlice } from "./payment.slice.js";
const persistConfig = {
  key: "dynamic",
  version: 1,
  storage,
  blacklist: ['otp'],
};

const rootReducer = combineReducers({
  authSlice: authSlice.reducer,
  modeSlice: modeSlice.reducer,
  otpSlice: otpSlice.reducer,
  paymentSlice: paymentSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export let persistor = persistStore(store);
