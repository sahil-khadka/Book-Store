import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../src/features/cartSlice";
import userReducer from "../src/features/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    userState: userReducer,
  },
});
