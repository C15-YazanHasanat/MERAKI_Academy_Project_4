import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"
import {setCategories} from "../redux/categorySlice"
const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
 
  const getAllCategories=()=>{
    axios.get("http://localhost:5000/category").then((res)=>{
        dispatch(setCategories(res.data))
    }).catch((err)=>{
        console.log(err);
        
    })
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  return null;
};

export default CategoryList;
