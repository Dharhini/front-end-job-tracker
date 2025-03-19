import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import JobList from "../components/JobList";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5186/api/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Admin Dashboard - Manage Jobs
      </Typography>
      <JobList jobs={jobs} fetchJobs={fetchJobs} />
    </Container>
  );
}

export default AdminDashboard;
