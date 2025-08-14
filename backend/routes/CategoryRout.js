const express = require("express");
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,deleteCategory
} = require("../controllers/CategoryController");

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;
