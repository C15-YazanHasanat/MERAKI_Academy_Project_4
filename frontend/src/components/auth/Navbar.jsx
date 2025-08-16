import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignInAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import "./Navbar.css";
import { useSelector } from "react-redux";
const Navbar = () => {
  const categories = useSelector((state) => state.categories?.items || []);
  const navigate = useNavigate();
  return (
    <header>
        
      {/* Top bar */}

      <div className="top-bar">
        <div className="top-links">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/about")}>About Us</span>
          <span onClick={() => navigate("/contact")}>Contact Us</span>
          <span onClick={() => navigate("/blog")}>Blog</span>
        </div>

        <div className="top-actions">
          <span onClick={() => navigate("/account")}>
            <FaUser /> My Account
          </span>
          <span onClick={() => navigate("/login")}>
            <FaSignInAlt /> Login
          </span>
          <span onClick={() => navigate("/cart")}>
            <FaShoppingCart /> Cart
          </span>
        </div>
      </div>

      {/* Middle bar */}

      <div className="middle-bar">
        <div className="logo" onClick={() => navigate("/")}>
          TECHNEST
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <button>
            <FaSearch />
          </button>
        </div>
        <div className="contact">
          QUESTIONS?{" "}
          <span
            className="chat-us"
            onClick={() => {
              navigate("/chatpage");
            }}
          >
            Chat US <FaComment />
          </span>
        </div>
      </div>

            {/* category-bar */}

      <nav className="category-bar">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <Link key={cat._id} to={`/category/${cat._id}`}>
              {cat.name}
            </Link>
          ))
        ) : (
          <span>Loading categories...</span>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
