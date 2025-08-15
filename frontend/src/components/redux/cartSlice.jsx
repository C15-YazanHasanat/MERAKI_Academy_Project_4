import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], 
  },
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const index = state.items.findIndex(item => item.product._id === product._id);
      if (index > -1) {
        state.items[index].quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
    },
    updateCartItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const index = state.items.findIndex(item => item.product._id === productId);
      if (index > -1) state.items[index].quantity = quantity;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product._id !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCart, addToCart, updateCartItem, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
