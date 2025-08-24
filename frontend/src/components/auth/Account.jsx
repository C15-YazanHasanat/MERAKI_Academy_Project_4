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
  const [orders, setOrders] = useState([]);
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
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllOrders();
    getUser();
  }, []);
  console.log(orders);

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: "flex", textAlign: "left", flexDirection: "column" }}>
        <Paper>
          <Typography
            ml={2}
            sx={{
              display: "inline-block",
              borderBottom: "1px solid black",
              fontFamily: "sans-serif",
              fontSize: "20px",
              textTransform: "uppercase",
              fontWeight: "600",
            }}
          >
            WELCOM {user.firstName} {user.lastName}
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={`E-MAIL : ${user.email}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`AGE : ${user.age} years`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`COUNTRY : ${user.country}`} />
            </ListItem>
          </List>
        </Paper>
      </Box>
      <Typography variant="h5" gutterBottom sx={{ marginTop: "5px" }}>
        Your Orders :
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        orders.map((order, i) => (
          <Paper
            key={i}
            sx={{
              padding: 2,
              marginY: 1,
              display: "flex",
              flexDirection: "row",
              gap: 2,
              backgroundColor: "rgba(190, 177, 179, 0.87)",
            }}
          >
            <Typography>
              <span style={{ fontWeight: "bold" }}>NAME :</span>{" "}
              {order.customerName}
            </Typography>

            <Typography>
              <span style={{ fontWeight: "bold" }}>PHONE :</span>{" "}
              {order.customerPhone}
            </Typography>

            <Typography>
              <span style={{ fontWeight: "bold" }}>NEAREST  LOCATION :</span>{" "}
              {order.address}
            </Typography>

            <Typography>
              <span style={{ fontWeight: "bold" }}>TOTAL PRICE :</span>{" "}
              {order.totalPrice} $
            </Typography>

            <Typography>
              <span style={{ fontWeight: "bold" }}>PAY METHOD :</span>{" "}
              {order.paymentMethod}
            </Typography>
            <Typography><span style={{ fontWeight: "bold" }}>Number Of Products : </span>{order.products.length}</Typography>
            <Typography>
              <span style={{ fontWeight: "bold" }}>STATUS :</span>
              <span style={{ color: "green" }}> {order.status}</span>
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};
export default Account;
