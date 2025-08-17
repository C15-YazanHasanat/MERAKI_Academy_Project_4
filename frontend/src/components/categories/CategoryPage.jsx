import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setProducts([]);
    axios
      .get(`http://localhost:5000/products/category/${categoryId}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categoryId]);

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
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Products in this category
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="180"
                image={product.images?.[0] || "https://via.placeholder.com/150"}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {product.description}
                </Typography>
                <Typography variant="subtitle1" color="primary" sx={{ mt: 1 }}>
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CategoryPage;
