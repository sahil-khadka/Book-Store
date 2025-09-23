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
    cancelOrderItem: (state, action) => {
      const { orderId, itemId } = action.payload;
      const order = state.orders.find((order) => order.id === orderId);
      if (order) {
        const itemIndex = order.items.findIndex((item) => item.id === itemId);
        if (itemIndex !== -1) {
          const cancelledItem = { ...order.items[itemIndex] };
          cancelledItem.status = "cancelled";
          order.items.splice(itemIndex, 1);

          // Create a new cancelled order entry for this item
          const cancelledOrder = {
            id: `${orderId}-${itemId}-cancelled`,
            orderNumber: `${order.orderNumber} (Item Cancelled)`,
            date: new Date().toISOString(),
            status: "cancelled",
            total: cancelledItem.price * cancelledItem.quantity,
            items: [cancelledItem],
          };

          state.orders.unshift(cancelledOrder);

          // Recalculate total for original order
          order.total = order.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );

          // If no items left, mark original order as cancelled
          if (order.items.length === 0) {
            order.status = "cancelled";
          }
        }
      }
    },
  },
});

export const { addOrder, updateOrderStatus, cancelOrder, cancelOrderItem } =
  ordersSlice.actions;
export default ordersSlice.reducer;
