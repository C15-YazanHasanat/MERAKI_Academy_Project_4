import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    name:"",
    phone:0
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
      const index = state.items.findIndex(
        (order) => order._id === updatedOrder._id
      );
      if (index > -1) state.items[index] = updatedOrder;
    },
    deleteOrderById: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((order) => order._id !== id);
    },
    setTheName: (state, action) => {
      state.name = action.payload;
    },
    setThePhone: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const {
  setOrders,
  addOrder,
  updateOrderById,
  deleteOrderById,
  setTheName,
  setThePhone,
} = orderSlice.actions;
export default orderSlice.reducer;
