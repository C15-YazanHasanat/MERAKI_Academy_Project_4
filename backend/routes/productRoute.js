const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require("../controllers/ProductController");

const productRouter = express.Router();

productRouter.get("/category/:categoryId", getProductsByCategory);
// path==>http://localhost:5000/products/category/:categoryId

productRouter.post("/", createProduct);
// path==>http://localhost:5000/products
productRouter.get("/", getProducts);
// path==>http://localhost:5000/products
productRouter.get("/:id", getProductById);
// path==>http://localhost:5000/products/:id
productRouter.put("/:id", updateProduct);
// path==>http://localhost:5000/products/:id
productRouter.delete("/:id", deleteProduct);
// path==>http://localhost:5000/products/:id


module.exports = productRouter;
