const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require("../controllers/ProductController");
const authorization = require("../middleware/authorization");
const productRouter = express.Router();
const upload = require("../config/multer");
const authentication = require("../middleware/authentication");

productRouter.get("/category/:categoryId", getProductsByCategory);
// path==>http://localhost:5000/products/category/:categoryId

productRouter.post(
  "/",
  authentication,                
  authorization("CREATE_PRODUCTS"), 
  upload.array("images", 5),    
  createProduct
);
// path==>http://localhost:5000/products
productRouter.get("/", getProducts);
// path==>http://localhost:5000/products
productRouter.get("/:id", getProductById);
// path==>http://localhost:5000/products/:id
productRouter.put(
  "/:id",
  authorization("EDIT_PRODUCTS"),
  upload.array("images",5),
  updateProduct
);
// path==>http://localhost:5000/products/:id
productRouter.delete("/:id",  deleteProduct);
// path==>http://localhost:5000/products/:id

module.exports = productRouter;
