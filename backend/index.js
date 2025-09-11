const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");
const Stripe = require("stripe");
const app = express();
const PORT = process.env.PORT || 5000;


//built-in middleware
app.use(cors());
app.use(express.json());

//stripe route

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
app.post("/api/create-payment-intent", (req, res) => {
  const { amount } = req.body;

  stripe.paymentIntents
    .create({ amount, currency: "usd" })
    .then((paymentIntent) =>
      res.status(200).json({ clientSecret: paymentIntent.client_secret })
    )
    .catch((err) => res.status(500).json({ message: err.message }));
});




//routers
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/CategoryRout");
const rolesRouter = require("./routes/roleRoute");
const usersRouter = require("./routes/usreRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

// router middleware

app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/roles", rolesRouter);
app.use("/users", usersRouter);
app.use("/carts", cartRouter);
app.use("/order", orderRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
