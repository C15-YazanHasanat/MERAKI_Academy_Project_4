const express = require("express");
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderControllers");


const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const orderRouter = express.Router();

orderRouter.use(authentication);

orderRouter.post("/", createOrder);

orderRouter.get("/", getOrders);

orderRouter.get("/:id", getOrderById);

orderRouter.put("/:id", authorization("UPDATE_ORDER"), updateOrderStatus);

module.exports = orderRouter;
