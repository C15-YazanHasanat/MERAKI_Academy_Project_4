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


cartRouter.post("/add", addToCart);


cartRouter.put("/update", updateCartItem);


cartRouter.delete("/remove", removeFromCart);

module.exports = cartRouter;
