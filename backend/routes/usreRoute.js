const express = require("express");
const {
  register,
  login,
  getCurrentUser,
  getAllUsers,
} = require("../controllers/userController");
const authentication = require("../middleware/authentication");
// define router
const usersRouter = express.Router();

usersRouter.post("/register", register);
// path==> http://localhost:5000/users/register
usersRouter.post("/login", login);
// path==> http://localhost:5000/users/login
usersRouter.get("/me", authentication, getCurrentUser);
// GET ==> http://localhost:5000/users/me

usersRouter.get("/allUsers",getAllUsers)
// GET ==> http://localhost:5000/users/allUsers




module.exports = usersRouter;
