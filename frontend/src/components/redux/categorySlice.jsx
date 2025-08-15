import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload;
    },
    addCategory: (state, action) => {
      state.items.push(action.payload);
    },
    updateCategoryById: (state, action) => {
      const updatedCategory = action.payload;
      const index = state.items.findIndex(cat => cat._id === updatedCategory._id);
      if (index !== -1) state.items[index] = updatedCategory;
    },
    deleteCategoryById: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(cat => cat._id !== id);
    },
  },
});

export const { setCategories, addCategory, updateCategoryById, deleteCategoryById } = categorySlice.actions;
export default categorySlice.reducer;
