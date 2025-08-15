import { createSlice } from "@reduxjs/toolkit";
export const productSlice=createSlice({
    name: "products",
  initialState: {
    items: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProductById: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.items.findIndex(
        (prod) => prod._id === updatedProduct._id
      );
      if (index !== -1) {
        state.items[index] = updatedProduct;
      }
    },
    deleteProductById: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((prod) => prod._id !== id);
    },
  },
})
export const {
  setProducts,
  addProduct,
  updateProductById,
  deleteProductById,
} = productSlice.actions;
export default productSlice.reducer;
