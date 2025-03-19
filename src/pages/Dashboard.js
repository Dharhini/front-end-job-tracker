import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import JobList from "../components/JobList";
import JobForm from "../components/JobForm";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5186/api/jobs");
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
        Job Applications
      </Typography>
      {loading ? (
        <div className="loading">Loading jobs...</div>
      ) : (
        <>
          <JobForm fetchJobs={fetchJobs} editingJob={editingJob} setEditingJob={setEditingJob} />
          <JobList jobs={jobs} fetchJobs={fetchJobs} setEditingJob={setEditingJob} />
        </>
      )}
    </Container>
  );
}

export default Dashboard;
