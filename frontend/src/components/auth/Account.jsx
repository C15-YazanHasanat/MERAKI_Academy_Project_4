import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const Account = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.auth.token);

  //!!=======Get user==========
  const getUser = () => {
    axios
      .get("https://meraki-academy-project-4-ue16.onrender.com/users/me", {
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
      .get("https://meraki-academy-project-4-ue16.onrender.com/order/myorders", {
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
        <TableContainer
          component={Paper}
          sx={{ width: "1400px", textAlign: "center" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NAME</TableCell>
                <TableCell>PHONE</TableCell>
                <TableCell>NEAREST LOCATION</TableCell>
                <TableCell>TOTAL PRICE ($)</TableCell>
                <TableCell>PAY METHOD</TableCell>
                <TableCell>Number Of Products</TableCell>
                <TableCell>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell sx={{ borderRight: "1px solid gray" }}>
                    {order.customerName}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid gray" }}>
                    {order.customerPhone}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid gray" }}>
                    {order.address}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid gray" }}>
                    {order.totalPrice}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid gray" }}>
                    {order.paymentMethod}
                  </TableCell>
                  <TableCell sx={{ borderRight: "1px solid gray" }}>
                    {order.products.length}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>{" "}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
export default Account;
