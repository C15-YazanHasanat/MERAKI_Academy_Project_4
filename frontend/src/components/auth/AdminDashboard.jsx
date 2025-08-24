import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productName || !price || !selectedCategory) {
      setMessage("Please fill all fields");
      return;
    }

    axios
      .post(
        "http://localhost:5000/products",
        {
          name: productName,
          price: parseFloat(price),
          category: selectedCategory,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setMessage("Product added successfully!");
        setProductName("");
        setPrice("");
        setSelectedCategory("");
      })
      .catch((err) => {
        setMessage("Error adding product");
        console.log(err);
      });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={3}>
        Admin Dashboard - Add Product
      </Typography>
      {message && (
        <Typography color="secondary" mb={2}>
          {message}
        </Typography>
      )}
      <form onSubmit={handleAddProduct}>
        <TextField
          label="Product Name"
          fullWidth
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </form>
    </Box>
  );
};

export default AdminDashboard;
