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
import { useNavigate } from "react-router-dom";
import "./category.css"
const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate=useNavigate()
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

  const categoryName = products[0]?.category?.name || "Category";

  return (
    <div style={{ padding: "20px" }} >
      <Typography variant="h4" gutterBottom>
        {categoryName}
      </Typography>
      <Grid container spacing={2} className="category">
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} onClick={()=>{
         navigate(`/products/${product._id}`);
    }}> 
            <Card sx={{ maxWidth: 200 }}  >
              <CardMedia
                component="img"
                height="100"
                image={product.images?.[0] || "https://via.placeholder.com/150"}
                alt={product.name}
              />
              <CardContent sx={{ p: 1 }}>
                <Typography variant="subtitle1" noWrap>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {product.description}
                </Typography>
                <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
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
