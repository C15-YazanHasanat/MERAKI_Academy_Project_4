import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Divider,
} from "@mui/material";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (!name || !address || !phone) {
      
      return <div>please</div>;
    }
    alert(`Order confirmed! Total: $${totalPrice}`);
  };

  return (
    <Box sx={{ padding: "20px", minHeight: "80vh" }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        {/* Order Summary */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
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
                  <Typography>
                    {item.product.name} x {item.quantity}
                  </Typography>
                  <Typography>
                    ${item.product.price * item.quantity}
                  </Typography>
                </Box>
              ))
            )}
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography variant="h6" align="right">
              Total: ${totalPrice}
            </Typography>
          </Paper>
        </Grid>

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
              label="Address"
              fullWidth
              margin="normal"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              label="Phone Number"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleCheckout}
            >
              Confirm Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
