import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/images/playstation2.png";
import slide2 from "../../assets/images/pc.png";
import slide3 from "../../assets/images/unname.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const slides = [
    {
      src: slide3,
      title: "Take your laptop",
      link: "/category/68a05b0f9e80ca53fa8e43ff",
    },
    {
      src: slide2,
      title: "Make your PC",
      link: "/category/68a05ac59e80ca53fa8e43fb",
    },
    {
      src: slide1,
      title: "Play with entertainment",
      link: "/category/68a05b039e80ca53fa8e43fd",
    },
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
              <button
                onClick={() => navigate(item.link)}
                style={{
                  display: "inline-block",
                  backgroundColor: "#080560",
                  color: "#fff",
                  padding: "12px 30px",
                  borderRadius: "25px",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "0.3s",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#fff";
                  e.target.style.color = "#080560";
                  e.target.style.border = "1px solid #080560";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#080560";
                  e.target.style.color = "#fff";
                  e.target.style.border = "none";
                }}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
