import Slider from "react-slick";
import { useSelector } from "react-redux";
import "./home.css";
import { useNavigate } from "react-router-dom";

const CategorySlider = () => {
  const category = useSelector((state) => state.categories.items);
  const product = useSelector((state) => state.product.items);

  const navigate = useNavigate();

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

  // إذا لم توجد بيانات، أظهر رسالة Loading
  if (!category || !product) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="category-slider-container">
      <h3 style={{ textAlign: "center", fontSize: "24px" }}>
        Shop by Category
      </h3>
      <br />
      <Slider {...settings}>
        {category.map((item) => {
          // تحقق من item و item._id قبل استخدامه
          if (!item || !item._id) return null;

          // استخدم Optional Chaining لتجنب crash
          const count = product.filter(
            (prod) => prod.category?._id === item._id
          ).length;

          return (
            <div
              key={item._id}
              className="category-slide"
              onClick={() => navigate(`/category/${item._id}`)}
            >
              <div className="category-image-wrapper">
                <img src={item.image} alt={item.name || "Category"} />
              </div>
              <h4>{item.name || "Unnamed"}</h4>
              <p>{count} items</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CategorySlider;
