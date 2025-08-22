import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const [user, setUser] = useState({});
  const [order, setOrder] = useState({});
  const token = useSelector((state) => state.auth.token);

  //!!=======Get user==========
  const getUser = () => {
    axios.get("http://localhost:5000/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res)=>{
        setUser(res.data.user)
        console.log(res.data.user);
        
    }).catch((err)=>{
        console.log(err);
        
    })
  };
useEffect(()=>{
    getUser()
},[])
  //!!===========get order=========
  const getAllOrders=()=>{
    axios.get("http://localhost:5000/order/myorders",{
         headers: { Authorization: `Bearer ${token}`}
    }).then((res)=>{
        console.log(res.data);
        
    }).catch((err)=>{
        console.log(err);
        
    })
  }
  useEffect(()=>{
    getAllOrders()
  },[])
  return (
    <div>
      <h1>This is My Account page</h1>
    </div>
  );
};
export default Account;