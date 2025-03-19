import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";
import JobForm from "../components/JobForm";
import UserJobList from "../components/UserJobList";

function UserDashboard() {
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    fetchJobs();
    fetchNotifications();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`http://localhost:5186/api/jobs/user-jobs?userEmail=${email}`);
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data?.message || error.message);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`http://localhost:5186/api/notifications/${email}`);
      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      console.log(`Marking notification ${id} as read`); // ✅ Debugging log
  
      const res = await axios.put(`http://localhost:5186/api/notifications/mark-as-read/${id}`);
      
      console.log("✅ Notification marked as read:", res.data);
  
      // Remove the notification from the state
      setNotifications(notifications.filter((n) => n.id !== id));
    } catch (error) {
      console.error("❌ Error marking notification as read:", error.response?.data?.message || error.message);
    }
  };
  

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Your Job Applications
      </Typography>

      {/* Notifications Section */}
{notifications.length > 0 && (
  <div style={{ backgroundColor: "#f8d7da", padding: "10px", borderRadius: "5px", marginBottom: "15px" }}>
    <Typography variant="h6">Notifications</Typography>
    {notifications.map((notification) => (
      <div key={notification.id} style={{ marginBottom: "5px" }}>
        <Typography>{notification.message}</Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => markNotificationAsRead(notification.id)}
          sx={{ marginTop: 1 }}
        >
          Mark as Read
        </Button>
      </div>
    ))}
  </div>
)}


      <JobForm fetchJobs={fetchJobs} />
      <UserJobList jobs={jobs} />
    </Container>
  );
}

export default UserDashboard;
