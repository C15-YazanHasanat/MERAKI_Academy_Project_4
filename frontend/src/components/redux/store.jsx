import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./ordersSlice";
import productReducer from "./productsSlice";
import categoryReducer from "./categorySlice";
import locationReducer from "./locationSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    product: productReducer,
    categories: categoryReducer,
    location:locationReducer
  },
});
