import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Divider,
  Box,
} from "@mui/material";

import { setCart,removeFromCart,clearCart } from "../redux/cartSlice";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { setLogout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //!=========get all cart===========
  const getAllCarts = () => {
    axios
      .get("https://meraki-academy-project-4-ue16.onrender.com/carts", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCartItem(res.data.products);
        dispatch(setCart(res.data.products));
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data?.message === "The token is invalid or expired") {
          dispatch(setLogout());
        }
      });
  };

  useEffect(() => {
    getAllCarts();
  }, []);

  //!=========delet cart===========

  const deleteCart = (productId) => {
    axios
      .delete("https://meraki-academy-project-4-ue16.onrender.com/carts/delete", {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      })
      .then((res) => {
        if (res.data.cart) {
          setCartItem(res.data.cart.products);
          dispatch(removeFromCart(productId))
        } else {
          setCartItem([]);
          dispatch(clearCart())
        }
      })
      .catch((err) => {
        console.log("Error removing product:", err);
        if (err.response?.data?.message === "The token is invalid or expired") {
          dispatch(setLogout());
        }
      });
  };

  //!=========update quantity cart===========

  const updateQuantity = (productId, quantity, className) => {
    if (quantity < 1) return;
    axios
      .put(
        "https://meraki-academy-project-4-ue16.onrender.com/carts/update",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setCartItem(res.data.cart.products);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItem.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <div>
          {cartItem.map((item, index) => (
            <div key={item.product._id}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <CardMedia
                    component="img"
                    height="80"
                    image={item.product.images[0]}
                    alt={item.product.name}
                    sx={{ objectFit: "contain" }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">{item.product.name}</Typography>

                  <Box display="flex" alignItems="center" mt={1}>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => deleteCart(item.product._id)}
                    >
                      <FaTrash />
                    </IconButton>
                    <Box
                      display="flex"
                      sx={{
                        border: "1px solid gray",
                        borderRadius: "15px",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity - 1)
                        }
                      >
                        <FaMinus />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity + 1)
                        }
                      >
                        <FaPlus />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={3}></Grid>
              </Grid>
              <Typography variant="h6" align="right">
                ${item.product.price}
              </Typography>
              {index < cartItem.length - 1 && <Divider sx={{ my: 2 }} />}
            </div>
          ))}
          <Box
            textAlign="right"
            mt={3}
            sx={{
              borderTop: "1px solid gray",
              padding: 2,
            }}
          >
            <Typography variant="h6">
              Items: (
              {cartItem.reduce((total, item) => total + item.quantity, 0)})
              Total: $
              {cartItem.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
              )}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                ":hover": {
                  backgroundColor: "#fff", 
                  color:"blue",
                  transform: "scale(1.05)", 
                },
                transition: "all 0.2s ease-in-out", 
              }}
              onClick={() => {
                navigate("/getAddress");
              }}
            >
              Checkout
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Cart;
