import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Slider,
} from "@mui/material";
import "./category.css";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]); // min,max
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setProducts([]);
    axios
      .get(`http://localhost:5000/products/category/${categoryId}`)
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);

        // 🔹 ضبط الـ Slider على أساس أسعار المنتجات
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

  // 🔹 تغيير القيمة من الـ Slider
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

  const categoryName = products[0]?.category?.name || "Category";

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {categoryName}
      </Typography>

      <Grid container spacing={2}>
        {/* ✅ Sidebar */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
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
        </Grid>

        {/* ✅ Products */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={2} className="category">
            {filteredProducts.map((product) => (
              <Grid
                item
                key={product._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                onClick={() => navigate(`/products/${product._id}`)}
              >
                <Card sx={{ maxWidth: 200 }}>
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
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                    >
                      {product.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="primary"
                      sx={{ mt: 0.5 }}
                    >
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CategoryPage;
