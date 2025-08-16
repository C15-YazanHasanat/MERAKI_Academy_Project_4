import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Product from "./components/Products/Product";
import ProductPage from "./components/Products/ProductPage";
import Cart from "./components/cart/cart";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminDashboard from "./components/auth/AdminDashboard";
import Navbar from "./components/auth/Navbar";
import CategoryList from "./components/categories/CategoryList";
import ChatPage from "./components/chatPage/ChatPage";
import Account from "./components/TobBAr files/Account";
import AboutUS from "./components/TobBAr files/about";
import Blog from "./components/TobBAr files/Blog";
import ContactUs from "./components/TobBAr files/ContactUs";

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <CategoryList/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/chatpage" element={<ChatPage/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/about" element={<AboutUS/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
         <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </div>
  );
};

export default App;
