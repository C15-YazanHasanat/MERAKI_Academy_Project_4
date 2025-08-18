import Slider from "react-slick";
import { useSelector } from "react-redux";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const CategorySlider=()=>{
 const category=useSelector((state)=>{
    return state.categories.items
 })
 const navigate=useNavigate()
 
const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="category-slider-container">
      <h3 style={{ textAlign: "center" }}>Shop by Category</h3>
      <br/>
      <Slider {...settings}>
        {category.map((item) => (
          <div key={item._id} className="category-slide" onClick={()=>{
            navigate(`/category/${item._id}`)
          }}>
            <div className="category-image-wrapper">
              <img
                src={item.image}
                alt={item.name}
              />
            </div>
            <h4 >{item.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlider