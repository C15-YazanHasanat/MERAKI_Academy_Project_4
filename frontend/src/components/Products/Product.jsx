import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setProducts,
  addProduct,
  updateProductById,
  deleteProductById,
} from "../redux/productsSlice";
const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);
  const getAllProduct = () => {
    axios
      .get(" http://localhost:5000/products")
      .then((res) => {        
        dispatch(setProducts(res.data.product));
      })
      .catch((res) => {});
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return null;
};
export default Product;
