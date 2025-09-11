import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Product from "./components/Products/Product";
import ProductPage from "./components/Products/ProductPage";
import Cart from "./components/cart/cart";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AdminDashboard from "./components/admin/AdminDashboard";
import Navbar from "./components/auth/Navbar";
import CategoryList from "./components/categories/CategoryList";
import Account from "./components/auth/Account";
import AboutUS from "./components/TobBAr files/about";
import Blog from "./components/TobBAr files/Blog";
import ContactUs from "./components/TobBAr files/ContactUs";
import CategoryPage from "./components/categories/CategoryPage";
import Checkout from "./components/Checkout/Checkout";
import GetAddress from "./components/Checkout/GetAddress";


const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <CategoryList/>
      <Product/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/account" element={<Account/>}/>
        <Route path="/about" element={<AboutUS/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
         <Route path="*" element={<h2>404 Not Found</h2>} />
         <Route path="/getAddress" element={<GetAddress/>}/>
      </Routes>
    </div>
  );
};

export default App;