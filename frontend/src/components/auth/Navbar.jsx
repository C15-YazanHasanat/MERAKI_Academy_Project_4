import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaSignInAlt, FaShoppingCart, FaSearch, FaPhone } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      {/* Top bar */}
      <div className="top-bar">
        <div className="top-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/gift">Gift Registry</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="top-actions">
          <Link to="/account"><FaUser /> My Account</Link>
          <Link to="/login"><FaSignInAlt /> Login</Link>
          <Link to="/cart"><FaShoppingCart /> Cart</Link>
        </div>
      </div>

      {/* Middle bar */}
      <div className="middle-bar">
        <div className="logo">TECHSAVE</div>
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <button><FaSearch /></button>
        </div>
        <div className="contact">
          QUESTIONS? CALL US <FaPhone /> 555.555.5555
        </div>
      </div>

      {/* Bottom nav (categories) */}
      <nav className="category-bar">
        {
          categories.map((cat) => (
            <Link key={cat._id} to={`/category/${cat._id}`}>
              {cat.name}
            </Link>
          ))}
      </nav>
    </header>
  );
};

export default Navbar;
