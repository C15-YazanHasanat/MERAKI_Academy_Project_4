const express = require("express");
const{ getProducts,
  createProduct,} =require("../controllers/ProductController")

  const productRouter=express.Router()

  productRouter.post("/",createProduct)
  productRouter.get("/",getProducts)

  module.exports=productRouter
