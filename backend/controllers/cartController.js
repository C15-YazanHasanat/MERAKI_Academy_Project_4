const CartModel = require("../models/CartSchema");
const ProductModel = require("../models/ProductSchema");

// Get cart for a user
const getCart = (req, res) => {
  const userId = req.user.userId;
  CartModel.findOne({ user: userId })
    .populate("products.product", "name price images")
    .then((cart) => {
      if (!cart) return res.status(404).json({ message: "Cart is empty" });
      res.json(cart);
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

// Add item to cart
const addToCart = (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  ProductModel.findById(productId)
    .then((product) => {
      if (!product) return res.status(404).json({ message: "Product not found" });

      return Cart.findOne({ user: userId }).then((cart) => {
        if (!cart) {
          const newCart = new Cart({
            user: userId,
            products: [{ product: productId, quantity }],
          });
          return newCart.save();
        } else {
          const itemIndex = cart.products.findIndex(
            (item) => item.product.toString() === productId
          );
          if (itemIndex > -1) {
            cart.products[itemIndex].quantity += quantity;
          } else {
            cart.products.push({ product: productId, quantity });
          }
          return cart.save();
        }
      });
    })
    .then((cart) => cart.populate("products.product", "name price images"))
    .then((cart) => res.json({ message: "Added to cart", cart }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

// Update cart item quantity
const updateCartItem = (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  CartModel.findOne({ user: userId })
    .then((cart) => {
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const itemIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex === -1)
        return Promise.reject({ status: 404, message: "Product not in cart" });

      cart.products[itemIndex].quantity = quantity;
      return cart.save();
    })
    .then((cart) => cart.populate("products.product", "name price images"))
    .then((cart) => res.json({ message: "Cart updated", cart }))
    .catch((err) =>
      res.status(err.status || 500).json({ message: err.message || err })
    );
};

// Remove item from cart
const removeFromCart = (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.body;

  CartModel.findOne({ user: userId })
    .then((cart) => {
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      cart.products = cart.products.filter(
        (item) => item.product.toString() !== productId
      );
      return cart.save();
    })
    .then((cart) => cart.populate("products.product", "name price images"))
    .then((cart) => res.json({ message: "Item removed", cart }))
    .catch((err) => res.status(500).json({ message: err.message }));
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart };
