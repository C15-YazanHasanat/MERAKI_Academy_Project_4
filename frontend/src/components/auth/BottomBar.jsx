import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaHome, FaComment } from "react-icons/fa";
import "./BottomBar.css";

const BottomBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom-bar">
      <div className="bottom-links">
        <span onClick={() => navigate("/")}>
          <FaHome /> Home
        </span>
        <span onClick={() => navigate("/category")}>Categories</span>
        <span onClick={() => navigate("/contact")}>
          <FaComment /> Contact
        </span>
      </div>

      <div className="bottom-info">© 2025 TECHNEST</div>

      <div className="bottom-actions">
        <span onClick={() => navigate("/cart")}>
          <FaShoppingCart /> Cart
        </span>
        <span onClick={() => navigate("/account")}>
          <FaUser /> Profile
        </span>
      </div>
    </div>
  );
};

export default BottomBar;
