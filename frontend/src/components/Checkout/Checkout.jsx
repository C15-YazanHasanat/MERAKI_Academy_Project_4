import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Divider,
  CardMedia,
} from "@mui/material";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);
  const location =JSON.parse(localStorage.getItem("marker"))
 console.log(location);
 
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  useEffect(()=>{
  if (location) {
  setAddress(`${location.lat} ${location.lng}`); 
}

  },[])

  return (
    <Box sx={{ padding: "20px", minHeight: "80vh" }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        
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
              sx={{ mt: 2,width:"200px",":hover": {
                  backgroundColor: "#fff", 
                  color:"blue",
                  transform: "scale(1.05)", 
                },
                transition: "all 0.2s ease-in-out",  }}
            >
              pay now
            </Button>
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
                  <Typography gutterBottom >
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
