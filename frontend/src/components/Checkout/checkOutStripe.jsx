import React, { useState } from "react";
import axios from "axios";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { Button, Box } from "@mui/material";
export default function PaymentPage() {
  const stripe = useStripe();
  const elements = useElements();
  const [prosccing, setProsccing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const name = useSelector((state) => {
    return state.order.name;
  });
  const phone = useSelector((state) => {
    return state.order.phone;
  });
  const cartItems = useSelector((state) => state.cart.items);
  const location = useSelector((state) => {
    return state.location.location;
  });
  const token = useSelector((state) => state.auth.token);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  //!=============handle Card Payment======
  const handleCardPayment = () => {
    if (!stripe || !elements) return;
    if (!name || !phone) {
      setErrorMessage(
        "Please enter your NAME and PHONE NUMBER before proceeding."
      );
      return;
    }

    setErrorMessage("");
    stripe
      .confirmPayment({
        elements,
        confirmParams: { return_url: window.location.href },
        redirect: "if_required",
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          setErrorMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
          const productsForOrder = cartItems.map((item) => ({
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          }));

          axios
            .post(
              "http://localhost:5000/order",
              {
                products: productsForOrder,
                address: location.nearestLocation,
                status: "Completed",
                paymentMethod: "card",
                customerName: name,
                customerPhone: phone,
                totalPrice: totalPrice,
                paymentStatus: "succeeded",
                paymentIntentId: paymentIntent.id,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
              setSuccessMessage(
                "Payment successful! Your order has been placed."
              );
              setTimeout(() => setSuccessMessage(""), 4000);
              setProsccing(true);
            })
            .catch((err) => {
              setErrorMessage("Error creating order after payment.");
            });
        }
      });
  };
  return (
    <div>
      <PaymentElement />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          width: "200px",
          ":hover": {
            backgroundColor: "#fff",
            color: "blue",
            transform: "scale(1.05)",
          },
          transition: "all 0.2s ease-in-out",
        }}
        disabled={prosccing}
        onClick={handleCardPayment}
      >
        pay now
      </Button>
      {errorMessage && (
        <Box sx={{ color: "red", mt: 1, mb: 1 }}>{errorMessage}</Box>
      )}
      {successMessage && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: "green",
            color: "white",
            borderRadius: 1,
          }}
        >
          {successMessage}
        </Box>
      )}
    </div>
  );
}
