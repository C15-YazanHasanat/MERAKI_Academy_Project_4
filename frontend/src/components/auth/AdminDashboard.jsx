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
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    isFeatured: false,
  });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreview(previewUrls);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const { name, price, category, stock } = form;

    if (!name || !price || !category || !stock) {
      setMessage("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    images.forEach((img) => formData.append("images", img));

    axios
      .post("http://localhost:5000/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage("Product added successfully!");
        setForm({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          isFeatured: false,
        });
        setImages([]);
        setPreview([]);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Error adding product");
      });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 700, margin: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3}>
        Admin Dashboard - Add Product
      </Typography>
      {message && (
        <Typography color="secondary" mb={2}>
          {message}
        </Typography>
      )}
      <Box
        component="form"
        onSubmit={handleAddProduct}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={3}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={form.category}
            label="Category"
            onChange={handleChange}
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={form.isFeatured}
              onChange={handleChange}
              name="isFeatured"
            />
          }
          label="Featured"
        />
        <Button variant="contained" component="label">
          Upload Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        {preview.length > 0 && (
          <Grid container spacing={2}>
            {preview.map((src, i) => (
              <Grid item key={i}>
                <img
                  src={src}
                  alt={`preview-${i}`}
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
    </Paper>
  );
};

export default AdminDashboard;
