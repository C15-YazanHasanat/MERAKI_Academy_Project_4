const express = require("express");
const {
  getCategories,
  createCategory,
}=require("../controllers/CategoryController");
const { model } = require("mongoose");


  const categoryRouter=express.Router()

  categoryRouter.post("/",createCategory)
  categoryRouter.get("/",getCategories)


  module.exports=categoryRouter
