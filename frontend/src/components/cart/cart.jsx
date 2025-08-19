import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const token = useSelector((state) => state.auth.token);

  //!=========get all cart===========
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

  //!=========delet cart===========

  const deleteCart = (productId) => {
    axios
      .delete("http://localhost:5000/carts/delete", {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      })
      .then((res) => {
        if (res.data.cart) {
          setCartItem(res.data.cart.products);
        } else {
          setCartItem([]);
        }
      })
      .catch((err) => {
        console.log("Error removing product:", err);
      });
  };

  //!=========update quantity cart===========

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    axios
      .put(
        "http://localhost:5000/carts/update",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setCartItem(res.data.cart.products);
      })
      .catch((err) => console.log(err));
  };
  console.log(cartItem);

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
                  <Typography variant="body2">
                    {item.product.description}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => deleteCart(item.product._id)}
                    >
                      <FaTrash />
                    </IconButton>
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
                </Grid>

                {/* السعر */}
                <Grid item xs={12} sm={3}></Grid>
              </Grid>
              <Typography variant="h6" align="right">
                ${item.product.price}
              </Typography>
              {/* خط فاصل بين المنتجات */}
              {index < cartItem.length - 1 && <Divider sx={{ my: 2 }} />}
            </div>
          ))}

          {/* المجموع الكلي */}
          <Box textAlign="right" mt={3}>
            <Typography variant="h6">
              Total: $
              {cartItem.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
              )}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Checkout
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Cart;
