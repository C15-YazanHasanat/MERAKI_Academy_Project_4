import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Slider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories.items || []);

  useEffect(() => {
    setLoading(true);
    setProducts([]);
    axios
      .get(`https://meraki-academy-project-4-ue16.onrender.com/products/category/${categoryId}`)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);

        if (res.data.length > 0) {
          const prices = res.data.map((p) => Number(p.price));
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceRange([minPrice, maxPrice]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryId]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    const [min, max] = newValue;
    const filtered = products.filter(
      (p) => Number(p.price) >= min && Number(p.price) <= max
    );
    setFilteredProducts(filtered);
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );

  if (products.length === 0)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        No products found
      </Typography>
    );

  return (
    <Box sx={{ display: "flex", gap: 2, p: 2 }}>
      <Box
        sx={{
          width: 300, 
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          boxShadow: 1,
          position: "sticky",
          top: 20,
          height: "fit-content",
          backgroundColor:"rgba(234, 240, 240, 1)"
        }}
      >
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <List>
          {categories.map((cat) => (
            <ListItem key={cat._id} disablePadding>
              <ListItemButton
                selected={cat._id === categoryId}
                onClick={() => navigate(`/category/${cat._id}`)}
              >
                <ListItemText primary={cat.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Filter by Price
          </Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={Math.min(...products.map((p) => Number(p.price)))}
            max={Math.max(...products.map((p) => Number(p.price)))}
            disableSwap
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            ${priceRange[0]} - ${priceRange[1]}
          </Typography>
        </Box>
      </Box>

      {/* Products */}
      <Box sx={{ flex: 1 }}>
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid
              item
              key={product._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              onClick={() => navigate(`/products/${product._id}`)}
              style={{ cursor: "pointer" }}
            >
              <Card
                sx={{
                  maxWidth: 200,
                  margin: "auto",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 6,
                  },
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={
                    product.images?.[0] || "https://via.placeholder.com/150"
                  }
                  alt={product.name}
                />
                <CardContent sx={{ p: 1 }}>
                  <Typography variant="subtitle1" noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {product.description}
                  </Typography>
                  <Typography variant="body1" color="primary" sx={{ mt: 0.5 }}>
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoryPage;
