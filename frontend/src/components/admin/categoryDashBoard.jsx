import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";

const CategoryDashBoard = () => {
  const token = useSelector((state) => state.auth.token);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  // 🟢 تغيير القيم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 🟢 تغيير الصورة (مع preview)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🟢 رفع الصورة إلى Cloudinary
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "tecknest");
    data.append("cloud_name", "dv2a5welg");

    return axios
      .post("https://api.cloudinary.com/v1_1/dv2a5welg/image/upload", data)
      .then((res) => res.data.secure_url);
  };

  // 🟢 إضافة الكاتيجوري
  const handleAddCategory = (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image");
      return;
    }

    uploadImage()
      .then((imageUrl) => {
        const categoryData = { ...form, image: imageUrl };

        return axios.post("http://localhost:5000/category", categoryData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then(() => {
        setMessage("Category added successfully!");
        setForm({ name: "", description: "" });
        setImage(null);
        setPreview(null);
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to add category");
      });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 700, margin: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3}>
        Add Category
      </Typography>

      <Box
        component="form"
        onSubmit={handleAddCategory}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Category Name"
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

        <Button variant="outlined" component="label">
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        {preview && (
          <Box>
            <img
              src={preview}
              alt="preview"
              style={{ width: "150px", borderRadius: "8px" }}
            />
          </Box>
        )}

        <Button type="submit" variant="contained" color="primary">
          Add Category
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

export default CategoryDashBoard;
