import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/Dashboard"; // ✅ Admin Dashboard
import UserDashboard from "./pages/UserDashboard"; // ✅ User Dashboard

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} /> {/* ✅ Admin Page */}
        <Route path="/user" element={<UserDashboard />} /> 
        <Route path="/signup" element={<Signup />} />{/* ✅ User Page */}
      </Routes>
    </Router>
  );
}

export default App;
