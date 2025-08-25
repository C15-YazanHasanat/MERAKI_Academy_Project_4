const express = require("express");
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");
const authorization = require("../middleware/authorization");
const authentication=require("../middleware/authentication")
const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  authentication, // ✅ أولًا تحقق من الـ token
  authorization("CREATE_CATEGORIES"),
  createCategory
);
// path==>http://localhost:5000/category
categoryRouter.get("/", getCategories);
// path==>http://localhost:5000/category
categoryRouter.get("/:id", getCategoryById);
// path==>http://localhost:5000/category/:id
categoryRouter.put(
  "/:id",
  authentication,
  authorization("EDIT_CATEGORIES"),
  updateCategory
);
// path==>http://localhost:5000/category/:id
categoryRouter.delete(
  "/:id",
  authentication,
  authorization("DELETE_CATEGORIES"),
  deleteCategory
);
// path==>http://localhost:5000/category/:id

module.exports = categoryRouter;
