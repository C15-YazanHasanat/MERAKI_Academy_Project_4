const express = require("express");
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getMyOrders,
} = require("../controllers/orderControllers");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const orderRouter = express.Router();

orderRouter.use(authentication);

orderRouter.post("/", createOrder);
//path==>http://localhost:5000/order
orderRouter.get("/", getOrders);
//path==>http://localhost:5000/order
orderRouter.get("/myorders", getMyOrders);
//path==>http://localhost:5000/order/myorders
orderRouter.put("/:id", authorization("UPDATE_ORDER"), updateOrderStatus);
//path==>http://localhost:5000/order/:id

module.exports = orderRouter;
