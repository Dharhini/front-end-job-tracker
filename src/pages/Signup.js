import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5186/api/auth/signup", { email, password });

      if (res.data.success) {
        alert("Signup successful! Please log in.");
        navigate("/"); // Redirect to login page
      } else {
        alert("Signup failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data?.message || error.message);
      alert("Error signing up!");
    }
  };
  
  

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Sign Up
        </Typography>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSignup}
        >
          Register
        </Button>
      </Paper>
    </Container>
  );
}

export default Signup;
