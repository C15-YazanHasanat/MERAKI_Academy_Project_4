import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Divider,
  CardMedia,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@mui/material";
import PaymentPage from "./checkOutStripe";
import axios from "axios";
const stripePromise = loadStripe(
  "pk_test_51RyfsFLLQTwwlxUp76qZYV8cVHCCLqef2qDqYuqXLZgG6QOzgrIubayS7vZ0ltERvP6Bt3BO8sDb0r16b1Se4deo00T09HbYDI"
);

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);
  const location = useSelector((state) => {
    return state.location.location;
  });
  const token = useSelector((state) => state.auth.token)
  const [payMehod, setPayMethod] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nearestLocation, setNearestLocation] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  useEffect(() => {
    if (location) {
      setNearestLocation(location.nearestLocation || "");
      setCoordinates(location.coordinates || { lat: "", lng: "" });
    }
  }, [location]);

  //!! ========get client secret=======
  const [clientSecret, setClientSecret] = useState("");
  const GetClientSecret = () => {
    axios
      .post("http://localhost:5000/api/create-payment-intent", {
        amount: totalPrice * 100,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (totalPrice > 0) {
      GetClientSecret();
    }
  }, [totalPrice]);

  //!!=====select pay method======
  const handleChange = (event) => {
    setPayMethod(event.target.value);
  };
  
  //!!=====pay with cash function=====
  const payCash = () => {
 const productsForOrder = cartItems.map(item => ({
  name: item.product.name,
  price: item.product.price,
  quantity: item.quantity,
}));

  axios
    .post(
      "http://localhost:5000/order",
      {
        products: productsForOrder,
        address: nearestLocation, 
        status: "Completed",
        paymentMethod: "cash",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      console.log("Cash order created:", res.data);
    })
    .catch((err) => {
      console.error("Error creating cash order:", err);
    });
};


  return (
    <Box sx={{ padding: "20px", minHeight: "80vh" }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="flex-start"
      >
        {/* Shipping Info */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Box sx={{ textAlign: "left", padding: "2px" }}>
              <Typography variant="body1">
                Nearest Location: {nearestLocation}
              </Typography>
              <Typography variant="body1">
                Coordinates: {coordinates.lat}, {coordinates.lng}
              </Typography>
            </Box>
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel sx={{ fontSize: "20px" }}>Payment Method</FormLabel>
                <RadioGroup value={payMehod} onChange={handleChange}>
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="Cash on Delivery"
                  />
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label="Pay by card"
                  />
                </RadioGroup>
              </FormControl>
              {payMehod === "card" && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentPage />
                </Elements>
              )}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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
                  onClick={()=>{
                    if (payMehod==="cash") {
                      payCash()
                    }
                  }}
                >
                  pay now
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        {/* Order Summary */}

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 2,
              width: "400px",
              height: "400px",
              backgroundColor: "rgb(223, 229, 234)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {cartItems.length === 0 ? (
              <Typography>Your cart is empty</Typography>
            ) : (
              cartItems.map((item) => (
                <Box
                  key={item.product._id}
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                >
                  <CardMedia
                    component="img"
                    height="40"
                    image={item.product.images[0]}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: "cover",
                      borderRadius: 2,
                      mr: 2,
                    }}
                  />
                  <Typography gutterBottom>
                    {item.product.name} (items {item.quantity})
                  </Typography>
                  <Typography>${item.product.price * item.quantity}</Typography>
                </Box>
              ))
            )}
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography variant="h6" align="right">
              Total: ${totalPrice}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
