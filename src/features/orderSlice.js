import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload); // Add new order at the beginning
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((order) => order.id === orderId);
      if (order) {
        order.status = status;
      }
    },
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      const order = state.orders.find((order) => order.id === orderId);
      if (order) {
        order.status = "cancelled";
      }
    },
  },
});

export const { addOrder, updateOrderStatus, cancelOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
