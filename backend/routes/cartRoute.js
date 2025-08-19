const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

const  authentication  = require("../middleware/authentication"); 

const cartRouter = express.Router();


cartRouter.use(authentication);


cartRouter.get("/", getCart);
//path==>http://localhost:5000/carts

cartRouter.post("/add", addToCart);
//path==>http://localhost:5000/carts/add


cartRouter.put("/update", updateCartItem);
//path==>http://localhost:5000/carts/update


cartRouter.delete("/delete", removeFromCart);
//path==>http://localhost:5000/carts/delete

module.exports = cartRouter;
