import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignInAlt, FaShoppingCart, FaSearch, FaBars, FaTimes,FaSignOutAlt } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import {setLogout} from "../redux/authSlice"
const Navbar = () => {
  const categories = useSelector((state) => state.categories.items);
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const isLoggedIn=useSelector((state)=>{
    return state.auth.isLoggedIn
  })
  const  userName=useSelector((state)=>{
    return state.auth.userName
  })
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="nav-bar">
      <div className="menu-btn" onClick={() => setSidebarOpen(true)}>
        <FaBars />
      </div>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={() => setSidebarOpen(false)}>
          <FaTimes />
        </div>

        <div className="sidebar-links">
          <span onClick={() => { navigate("/"); setSidebarOpen(false); }}>Home</span>
          <span onClick={() => { navigate("/about"); setSidebarOpen(false); }}>About Us</span>
          <span onClick={() => { navigate("/contact"); setSidebarOpen(false); }}>Contact Us</span>
          <span onClick={() => { navigate("/blog"); setSidebarOpen(false); }}>Blog</span>
        </div>

        <div className="sidebar-actions">
          <span onClick={() => { navigate("/account"); setSidebarOpen(false); }}>
            <FaUser /> My Account
          </span>
          
          <span onClick={() => { navigate("/cart"); setSidebarOpen(false); }}>
            <FaShoppingCart /> Cart
          </span>
          {isLoggedIn ?(
        <span
      onClick={() => {
        
        dispatch(setLogout());
        setSidebarOpen(false);
        navigate("/"); 
      }}
    >
      Logout  <FaSignOutAlt /> 
    </span>):
    <span onClick={() => { navigate("/login"); setSidebarOpen(false); }}>
            <FaSignInAlt /> Login
          </span>
    }
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
         {isLoggedIn && userName && (
    <span className="user-name" onClick={()=>{
      navigate("/account")
    }}><FaUser />Welcome {userName}</span>
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
    </div>
  );
};

export default Navbar;
