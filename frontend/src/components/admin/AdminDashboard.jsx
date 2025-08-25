import React, { useState } from "react";
import { Paper, Box, Button, Typography } from "@mui/material";
import ProductDashBoard from "./producatDashboard";
import CategoryDashBoard from "./categoryDashBoard";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <Paper sx={{ p: 4, maxWidth: 900, margin: "auto", mt: 4 }}>
      <Typography variant="h4" mb={3}>
        Admin Dashboard
      </Typography>

      
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button
          variant={activeTab === "products" ? "contained" : "outlined"}
          onClick={() => setActiveTab("products")}
        >
          Products
        </Button>
        <Button
          variant={activeTab === "categories" ? "contained" : "outlined"}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </Button>
        <Button
          variant={activeTab === "info" ? "contained" : "outlined"}
          onClick={() => setActiveTab("info")}
        >
          Info
        </Button>
      </Box>

      <Box>
        {activeTab === "products" && <ProductDashBoard/>}
        {activeTab === "categories" && <CategoryDashBoard/>}
        {activeTab === "info" && (
          <Typography>Info Panel will be here</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default AdminDashboard;
