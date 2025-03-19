import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5186/api/auth/login", { // ✅ Ensure this matches backend URL
        email,
        password,
      });
  
      console.log("Login Success:", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", email);
  
      if (email === "admin@admin.com") {
        navigate("/dashboard");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Login Error Object:", error);
      console.error("Error Response:", error.response?.data || "No response from server.");
  
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };
  
    


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center" }}>
        <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Login
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
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#1976d2", fontWeight: "bold" }}>
            Sign up here
          </a>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
