import { setLogin, setUserId } from "../redux/authSlice";
import React, { useState } from "react";

import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
const login = async (e) => {
    
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      if (result.data) {
        setMessage(""); 
        dispatch(setLogin(result.data.token))
        dispatch(setUserId(result.data.userId))
        navigate("/");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "110vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={login}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2, backgroundColor: "#d82323" }}
          >
            Login
          </Button>
        </form>

        {message && (
          <Typography
            align="center"
            sx={{ marginTop: 2, color: status ? "green" : "red" }}
          >
            {message}
          </Typography>
        )}

        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 2, cursor: "pointer", color: "#d82323" }}
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </Typography>
      </Paper>
    </Box>
  );
};
export default Login;
