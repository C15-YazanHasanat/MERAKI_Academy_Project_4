const OrderModel = require("../models/orderSchema");

// Create new order
const createOrder = (req, res) => {
  const userId = req.user.userId;
  const {
    products,
    address,
    paymentMethod,
    status,
    customerName,
    customerPhone,
    paymentIntentId,
    totalPrice,
  } = req.body;

  if (!products || products.length === 0)
    return res.status(400).json({ message: "No products in order" });

  const order = new OrderModel({
    user: userId,
    products,
    address,
    paymentMethod,
    status,
    customerName,
    customerPhone,
    paymentStatus: "succeeded",
    paymentIntentId,
    totalPrice,
  });

  order
    .save()
    .then(() =>
      res.status(201).json({
        message: "Order created",
      })
    )
    .catch((err) => res.status(500).json({ message: err.message }));
};

// Get all orders for logged in user
const getOrders = (req, res) => {
  const userId = req.user.userId;

  OrderModel.find({ user: userId })
    .populate("products.product", "name price images")
    .then((orders) => {
      if (!orders.length)
        return res.status(404).json({ message: "No orders found" });
      res.json(orders);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

// Get order by ID
const getOrderById = (req, res) => {
  const userId = req.user.userId;

  OrderModel.findOne({ _id: req.params.id, user: userId })
    .populate("products.product", "name price images")
    .then((order) => {
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json(order);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

// Update order status (Admin only)
const updateOrderStatus = (req, res) => {
  const { status } = req.body;

  OrderModel.findById(req.params.id)
    .then((order) => {
      if (!order) return res.status(404).json({ message: "Order not found" });

      order.status = status || order.status;
      return order.save();
    })
    .then((order) => order.populate("products.product", "name price images"))
    .then((order) => res.json({ message: "Order status updated", order }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus };
