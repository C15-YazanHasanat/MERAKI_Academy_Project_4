import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
const Account = () => {
  const [user, setUser] = useState({});
  const [order, setOrder] = useState([]);
  const token = useSelector((state) => state.auth.token);

  //!!=======Get user==========
  const getUser = () => {
    axios
      .get("http://localhost:5000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //!!===========get order=========
  const getAllOrders = () => {
    axios
      .get("http://localhost:5000/order/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrder(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllOrders();
    getUser();
  }, []);
  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.firstName} {user.lastName}
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography>
              <strong>Age:</strong> {user.age}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <strong>Country:</strong> {user.country}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Your Orders
      </Typography>
      {order.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        order.map((order) => (
          <Paper
            key={order._id}
            sx={{ padding: 2, marginBottom: 3 }}
            elevation={2}
          >
            <Typography variant="subtitle1" gutterBottom>
              Order ID: {order._id}
            </Typography>
            <Divider sx={{ marginY: 1 }} />
            <Typography>
              <strong>Status:</strong> {order.status}
            </Typography>
            <Typography>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </Typography>
            <Typography>
              <strong>Total Price:</strong> ${order.totalPrice}
            </Typography>
            <Typography>
              <strong>Address:</strong> {order.address}
            </Typography>
            <Typography>
              <strong>Customer Name:</strong> {order.customerName}
            </Typography>
            <Typography>
              <strong>Customer Phone:</strong> {order.customerPhone}
            </Typography>

            <Typography variant="subtitle2" sx={{ marginTop: 1 }}>
              Products:
            </Typography>
            <List dense>
              {order.products.map((prod, idx) => (
                <ListItem key={idx} sx={{ pl: 0 }}>
                  <ListItemText
                    primary={`${prod.name} - $${prod.price} x ${prod.quantity}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))
      )}
    </Box>
  );
};
export default Account;
