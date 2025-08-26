import React from "react";
import HomeSlider from "./homwSlider";
import CategorySlider from "./CategorySlider";
import { Box, CardMedia } from "@mui/material";
import offer from "../../assets/images/offer.png";
import offer1 from "../../assets/images/offer1.png";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate=useNavigate()
  return (
    <div>
      <HomeSlider />
      <br />
      <CategorySlider />
      <br />
      <br />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CardMedia
          component="img"
          height="400"
          image={offer}
          alt="offer"
          sx={{ objectFit: "contain",cursor:"pointer" }}
          onClick={()=>{
            navigate("/category/68a05b0f9e80ca53fa8e43ff")
          }}
        />
        <CardMedia
          component="img"
          height="400"
          image={offer1}
          alt="offer"
          sx={{ objectFit: "contain",cursor:"pointer" }}
          onClick={()=>{
            navigate("/category/68a05b469e80ca53fa8e4405")
          }}
        />
      </Box>
    </div>
  );
};

export default Home;
