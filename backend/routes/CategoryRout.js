const express = require("express");
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,deleteCategory
} = require("../controllers/CategoryController");

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
// path==>http://localhost:5000/category
categoryRouter.get("/", getCategories);
// path==>http://localhost:5000/category
categoryRouter.get("/:id", getCategoryById);
// path==>http://localhost:5000/category/:id
categoryRouter.put("/:id", updateCategory);
// path==>http://localhost:5000/category/:id
categoryRouter.delete("/:id", deleteCategory);
// path==>http://localhost:5000/category/:id

module.exports = categoryRouter;
