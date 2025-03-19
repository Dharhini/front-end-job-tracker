import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Job Tracker
        </Typography>
        {!token ? (
          <Button color="inherit" component={Link} to="/">
            Login
          </Button>
        ) : (
          <>
            {role === "Admin" ? (
              <Button color="inherit" component={Link} to="/dashboard">
                Admin Dashboard
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/user">
                User Dashboard
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
