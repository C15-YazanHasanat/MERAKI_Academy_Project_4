import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignInAlt,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/authSlice";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const categories = useSelector((state) => state.categories.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userName = useSelector((state) => state.auth.userName);
  const product = useSelector((state) => state.product.items);
const cartItems=useSelector((state)=>{
  return state.cart.items
})

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = product.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="nav-bar">
      <div className="menu-btn" onClick={() => setSidebarOpen(true)}>
        <FaBars />
      </div>

      {/* sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={() => setSidebarOpen(false)}>
          <FaTimes />
        </div>

        <div className="sidebar-links">
          <span
            onClick={() => {
              navigate("/");
              setSidebarOpen(false);
            }}
          >
            Home
          </span>
          <span
            onClick={() => {
              navigate("/about");
              setSidebarOpen(false);
            }}
          >
            About Us
          </span>
          <span
            onClick={() => {
              navigate("/contact");
              setSidebarOpen(false);
            }}
          >
            Contact Us
          </span>
          <span
            onClick={() => {
              navigate("/blog");
              setSidebarOpen(false);
            }}
          >
            Blog
          </span>
        </div>
      </div>

      {/* middle bar */}
      <div className="middle-bar">
        <div className="logo" onClick={() => navigate("/")}>
          TECHNEST
        </div>

        {/* search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>
            <FaSearch />
          </button>

          {search && (
            <div className="search-results">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <div
                    key={p._id}
                    className="search-item"
                    onClick={() => {
                      navigate(`/products/${p._id}`);
                      setSearch("");
                    }}
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="search-img"
                    />
                    <span>{p.name}</span>
                  </div>
                ))
              ) : (
                <div className="search-item">No results found</div>
              )}
            </div>
          )}
        </div>

        <div className="user-cart">
          {isLoggedIn && userName && (
            <span
              className="user-name"
              onClick={() => {
                navigate("/account");
              }}
            >
              <FaUser /> Welcome {userName}
            </span>
          )}
          <span
            onClick={() => {
              navigate("/cart");
            }}
          >
            <FaShoppingCart /> Cart
            {cartItems.length > 0 && (
      <p className="cart-count">({cartItems.length})</p>
    )}
          </span>

          {isLoggedIn ? (
            <span
              onClick={() => {
                dispatch(setLogout());
                navigate("/");
              }}
            >
              Logout <FaSignOutAlt />
            </span>
          ) : (
            <span
              onClick={() => {
                navigate("/login");
              }}
            >
              <FaSignInAlt /> Login
            </span>
          )}
        </div>
      </div>

      {/* category */}
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
      </nav>
    </div>
  );
};

export default Navbar;
