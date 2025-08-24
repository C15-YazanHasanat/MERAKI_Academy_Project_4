const express = require("express");
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,deleteCategory
} = require("../controllers/CategoryController");
const authorization =require("../middleware/authorization")

const categoryRouter = express.Router();

categoryRouter.post("/",authorization("CREATE_CATEGORIES"), createCategory);
// path==>http://localhost:5000/category
categoryRouter.get("/", getCategories);
// path==>http://localhost:5000/category
categoryRouter.get("/:id", getCategoryById);
// path==>http://localhost:5000/category/:id
categoryRouter.put("/:id",authorization("EDIT_CATEGORIES"), updateCategory);
// path==>http://localhost:5000/category/:id
categoryRouter.delete("/:id",authorization("DELETE_CATEGORIES"), deleteCategory);
// path==>http://localhost:5000/category/:id

module.exports = categoryRouter;
