import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  TextField,
} from "@mui/material";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const getAllCarts = () => {
    axios
      .get("http://localhost:5000/carts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCartItem(res.data.products || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCarts();
  }, []);
  // !!========delete cart=======
  const deleteCart = (productId) => {
    axios
      .delete("http://localhost:5000/carts/delete", {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      })
      .then((res) => {
        console.log(res.data);
        getAllCarts()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItem.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={2}>
          {cartItem.length&&cartItem.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.product._id}>
              <Card sx={{ padding: 1 }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={item.product.images[0]}
                  alt={item.product.name}
                />
                <Typography variant="h6">{item.product.name}</Typography>
                <Typography variant="body2">
                  Price: ${item.product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 1 }}
                  onClick={() => deleteCart(item.product._id)}
                >
                  Remove
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {cartItem.length > 0 && (
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Checkout
        </Button>
      )}
    </div>
  );
};

export default Cart;
