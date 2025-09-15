import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../src/features/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
