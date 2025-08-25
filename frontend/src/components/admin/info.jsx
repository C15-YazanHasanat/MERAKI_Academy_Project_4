import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
const Info = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const token = useSelector((state) => state.auth.token);
const categories=useSelector((state)=>state.categories.items)
  //!!======== Get all users=========
  const getAllUsers = () => {
    axios
      .get("http://localhost:5000/users/allUsers")
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.log(err));
  };

  //!======= Get all orders===========
  const getAllOrders = () => {
    axios
      .get("http://localhost:5000/order", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data.orders))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllUsers();
    getAllOrders();
  }, []);
//!!==================
const otherSetting = {
  height: 300,
  yAxis: [{ label: 'sales ($)', width: 60 }],
  grid: { horizontal: true },
};
const valueFormatter = (value) => `${value}mm`;
  return (
    <Box p={4}>
      {/* Users Table */}
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Orders Table */}
      <Typography variant="h5" gutterBottom>
        Orders
      </Typography>
      <TableContainer component={Paper} sx={{ width: "800px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Costumer Name</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Pay Method</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>{order.paymentMethod}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BarChart
      dataset={categories}
      xAxis={[
        {
          scaleType: 'band',
          dataKey: 'category',
          valueFormatter: (category, context) =>
            context.location === 'tick'
              ? `${category.name.slice(0, 3)} \n2023`
              : `${category.name} 2023`,
          height: 40,
        },
      ]}
      series={[{ dataKey: 'sales', label: 'sales $', valueFormatter }]}
      {...otherSetting}
    />
    </Box>
  );
};

export default Info;
