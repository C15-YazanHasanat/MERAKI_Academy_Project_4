const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      }
    ],
    status: { type: String},
    paymentStatus: { type: String, default: "pending" },
    paymentIntentId: { type: String },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    totalPrice:{type:Number,required:true}
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
