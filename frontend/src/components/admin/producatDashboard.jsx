import React, { useState } from "react";
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
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

const ProductDashBoard = () => {
  const token = useSelector((state) => state.auth.token);
  const categories = useSelector((state) => state.categories.items);
  const products = useSelector((state) => state.product.items);
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
  const [selectedProductToDelete, setSelectedProductToDelete] = useState("");
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
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const uploadImages = () => {
    const uploaders = images.map((image) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "tecknest");
      data.append("cloud_name", "dv2a5welg");

      return axios
        .post("https://api.cloudinary.com/v1_1/dv2a5welg/image/upload", data)
        .then((res) => res.data.secure_url);
    });
    return Promise.all(uploaders);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    uploadImages()
      .then((imageUrls) => {
        const productData = {
          ...form,
          images: imageUrls,
        };

        return axios.post("https://meraki-academy-project-4-ue16.onrender.com/products", productData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then(() => {
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
        setMessage("Failed to add product");
      });
  };

  const handleDeleteProduct = (e) => {
    e.preventDefault();
    if (!selectedProductToDelete) {
      setMessage("Please select a product to delete");
      return;
    }

    axios
      .delete(`https://meraki-academy-project-4-ue16.onrender.com/products/${selectedProductToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setMessage("Product deleted successfully!");
        setSelectedProductToDelete("");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to delete product");
      });
  };
  return (
    <Paper sx={{ p: 4, maxWidth: 700, margin: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3}>
        Admin Dashboard - Add Product
      </Typography>
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

        <Button variant="outlined" component="label">
          Upload Images
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {preview.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`preview-${idx}`}
              style={{ width: "100px", borderRadius: "8px" }}
            />
          ))}
        </Box>

        <Button type="submit" variant="contained" color="primary">
          Add Product
        </Button>
      </Box>
      <br />
      {/* Delete Product Form */}
      <Box
        component="form"
        onSubmit={handleDeleteProduct}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl fullWidth>
          <InputLabel>Select Product to Delete</InputLabel>
          <Select
            value={selectedProductToDelete}
            onChange={(e) => setSelectedProductToDelete(e.target.value)}
            required
          >
            {products.map((product) => (
              <MenuItem key={product._id} value={product._id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{
            width: "250px",
            textAlign: "center",
            margin: "auto", 
          }}
        >
          Delete Product
        </Button>
      </Box>
      {message && (
        <Typography color="secondary" mt={2}>
          {message}
        </Typography>
      )}
    </Paper>
  );
};

export default ProductDashBoard;
