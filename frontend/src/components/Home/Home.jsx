import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/images/small.jpg";
import slide2 from "../../assets/images/2.jpg";
import slide3 from "../../assets/images/lap.webp";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

const Home = () => {
  const slides = [
    { src: slide1, title: "Fresh fruits & vegetables", link: "/collection/fruits" },
    { src: slide2, title: "Organic Indian Masala", link: "/collection/spices" },
    { src: slide3, title: "Top Selling Items", link: "/collection/bestsellers" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="home-slider-compact">
      <Slider {...settings}>
        {slides.map((item, index) => (
          <div key={index} className="slide-item">
            <img src={item.src} alt={`Slide ${index + 1}`} />
            <div className="slide-overlay">
              <h2>{item.title}</h2>
              <a href={item.link} className="shop-btn">Shop Now</a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
