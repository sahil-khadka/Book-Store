import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../src/features/cartSlice";
import userReducer from "../src/features/userSlice";
import ordersReducer from "../src/features/orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    userState: userReducer,
    orders: ordersReducer,
  },
});
