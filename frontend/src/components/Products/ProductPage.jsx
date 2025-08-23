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
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "./Product.css";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [messageCArt, setMessageCart] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.auth.token;
  });
  // !!--- Function to fetch product by ID ---
const fetchProductById = (productId) => {
  setLoading(true);

  axios
    .get(`http://localhost:5000/products/${productId}`)
    .then((res) => {
      setProduct(res.data);

      if (res.data.images && res.data.images.length > 0) {
        setMainImage(res.data.images[0]);
      }

      setLoading(false);
    })
    .catch((err) => {
      console.error(err);

      setLoading(false);
    });
};


  useEffect(() => {
    fetchProductById(id);
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

  //!====add to cart==============

  const addCart = () => {
    setMessageCart(null);
    axios
      .post(
        "http://localhost:5000/carts/add",
        { productId: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {

        dispatch(addToCart({ product: product, quantity: 1 }));;
        setMessageCart(true);
        setTimeout(() => setMessageCart(null), 2000);
      })
      .catch((err) => {
        console.log(err.response.data.message);

        setMessageCart(false);
        setTimeout(() => setMessageCart(null), 2000);
      });
  };
  return (
    <div style={{ padding: "20px", paddingBottom: "70px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={mainImage}
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
                      mainImage === img
                        ? "2px solid #080560"
                        : "1px solid #ddd",
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
          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
          <Typography
            className="price"
            variant="h5"
            color="primary"
            gutterBottom
          >
            Price: ${product.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            In Stock: {product.stock}
          </Typography>

          <Button
            className="button"
            variant="contained"
            sx={{ mt: 2 }}
            onClick={addCart}
          >
            Add to Cart
          </Button>
          {messageCArt === true && (
            <div className="sucmsg"> added to cart</div>
          )}
          {messageCArt === false && (
            <div className="errmsg"> please login</div>
          )}
          
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductPage;
