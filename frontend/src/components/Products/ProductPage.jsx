import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import "./Product.css"
const ProductPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        if (res.data.images && res.data.images.length > 0) {
          setMainImage(res.data.images[0]); 
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );

  if (!product)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        Product not found
      </Typography>
    );

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={mainImage || "https://via.placeholder.com/400"}
              alt={product.name}
            />
          </Card>

          <Grid
            container
            spacing={1}
            sx={{ mt: 1, flexWrap: "nowrap", overflowX: "auto" }}
          >
            {product.images?.map((img, idx) => (
              <Grid item key={idx} sx={{ flex: "0 0 auto" }}>
                <Card
                  sx={{
                    cursor: "pointer",
                    border:
                      mainImage === img ? "2px solid #080560" : "1px solid #ddd",
                    width: 80,
                  }}
                  onClick={() => setMainImage(img)}
                >
                  <CardMedia
                    component="img"
                    height="80"
                    image={img}
                    alt={`thumbnail-${idx}`}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" >
            {product.description}
          </Typography>
          <Typography className="price" variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In Stock: {product.stock}
          </Typography>

          <Button className="button" variant="contained"  sx={{ mt: 2 }}>
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductPage;
