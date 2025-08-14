const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,deleteProduct 
} = require("../controllers/ProductController");

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);


module.exports = productRouter;
