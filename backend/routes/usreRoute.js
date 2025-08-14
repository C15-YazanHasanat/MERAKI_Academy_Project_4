const express = require("express");
const { register, login } = require("../controllers/userController");

// define router
const usersRouter = express.Router();


usersRouter.post("/register", register);
// path==> http://localhost:5000/users/register
usersRouter.post("/login", login);
// path==> http://localhost:5000/users/login
module.exports = usersRouter;
