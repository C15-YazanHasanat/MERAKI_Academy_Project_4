import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.items = action.payload;
    },
    addOrder: (state, action) => {
      state.items.push(action.payload);
    },
    updateOrderById: (state, action) => {
      const updatedOrder = action.payload;
      const index = state.items.findIndex(order => order._id === updatedOrder._id);
      if (index > -1) state.items[index] = updatedOrder;
    },
    deleteOrderById: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(order => order._id !== id);
    },
  },
});

export const { setOrders, addOrder, updateOrderById, deleteOrderById } = orderSlice.actions;
export default orderSlice.reducer;
