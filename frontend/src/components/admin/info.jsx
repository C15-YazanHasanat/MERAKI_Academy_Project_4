import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Info = () => {
  const [users, setusers] = useState([]);
  const [ordres, setorders] = useState([]);
  const token = useSelector((state) => state.auth.token);

  //!!======get all users======
  const getAllusres = () => {
    axios
      .get("http://localhost:5000/users/allUsers")
      .then((user) => {
        setusers(user.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //!!======get all ordres======
  const getAllOrders = () => {
    axios
      .get("http://localhost:5000/order", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((orders) => {
        setorders(orders.data.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllusres();
    getAllOrders();
  }, []);
};

export default Info;
