import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";

const CategoryDashBoard = () => {
  const token = useSelector((state) => state.auth.token);
  const categories = useSelector((state) => state.categories.items);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedCategoryToDelete, setSelectedCategryToDelete] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "tecknest");
    data.append("cloud_name", "dv2a5welg");

    return axios
      .post("https://api.cloudinary.com/v1_1/dv2a5welg/image/upload", data)
      .then((res) => res.data.secure_url);
  };

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

  //!!!=====delet category=======
  const handleDeleteCategory = (e) => {
    e.preventDefault();
    if (!selectedCategoryToDelete) {
      setMessage("Please select a category to delete");
      return;
    }

    axios
      .delete(`http://localhost:5000/category/${selectedCategoryToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setMessage("Category deleted successfully!");
        setSelectedCategryToDelete("");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to delete category");
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
      <br/>
      <Box
        component="form"
        onSubmit={handleDeleteCategory}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl fullWidth>
          <InputLabel>Select Product to Delete</InputLabel>
          <Select
            value={selectedCategoryToDelete}
            onChange={(e) => setSelectedCategryToDelete(e.target.value)}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
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
          Delete Category
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
