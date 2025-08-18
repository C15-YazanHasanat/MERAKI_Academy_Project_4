import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const reg = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/register", {
        firstName,
        lastName,
        age,
        country,
        email,
        password,
      })
      .then((res) => {
        setStatus(true);
        setMessage(res.data.message);
        
      })
      .catch((err) => {
        setStatus(false);
      if (err.response && err.response.data) {
        return setMessage(err.response.data.message);
      }
      setMessage("Error happened while register, please try again");
      });
  };

  return (
    <Box
    className="fade-in"
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
          Create Account
        </Typography>
        <form onSubmit={reg}>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Age"
            type="number"
            fullWidth
            margin="normal"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField
            label="Country"
            fullWidth
            margin="normal"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
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
            sx={{ marginTop: 2, backgroundColor: "#080560" }}
          >
            Register
          </Button>
        </form>

        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}

        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 2, cursor: "pointer", color: "#162be8fe" }}
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
