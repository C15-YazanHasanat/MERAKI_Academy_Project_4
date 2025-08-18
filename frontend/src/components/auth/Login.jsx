import { setLogin, setUserId } from "../redux/authSlice";
import React, { useState } from "react";
import './Register.css';

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
        console.log(error);
        
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };
  return (
    <Box
    className="fade-in"

      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={10} sx={{ padding: 4, width: 400 }}>
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
            slotProps={{ htmlInput: { 'data-testid': '…' } }}
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
            sx={{ marginTop: 2, backgroundColor: "#080560" }}
          >
            Login
          </Button>
        </form>

        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}

        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 2, cursor: "pointer", color: "#162be8fe" }}
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </Typography>
      </Paper>
    </Box>
  );
};
export default Login;
