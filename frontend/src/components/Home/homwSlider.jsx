import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/images/playstation2.png";
import slide2 from "../../assets/images/pc.png";
import slide3 from "../../assets/images/unname.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

const Home = () => {
  const slides = [
    { src: slide3, title: "Take your laptop", link: "/category/68a05b0f9e80ca53fa8e43ff" },
    { src: slide2, title: "Make your PC", link: "/category/68a05ac59e80ca53fa8e43fb" },
    { src: slide1, title: "Play with entertainment", link: "/category/68a05b039e80ca53fa8e43fd" },
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