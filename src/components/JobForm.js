import React, { useState } from "react";
import { TextField, Button, Paper, Container } from "@mui/material";
import axios from "axios";

function JobForm({ fetchJobs }) { // ✅ Removed `setEditingJob` as it's not needed
  const [job, setJob] = useState({ company: "", position: "", status: "Pending" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        alert("User email is missing. Please log in again.");
        return;
      }
  
      console.log("Submitting job for:", email);
  
      const jobData = {
        company: job.company.trim(), // Ensure no empty spaces
        position: job.position.trim(),
        status: "Pending",
        userEmail: email.trim()
      };
  
      console.log("Sending job data:", jobData); // ✅ Debugging log
  
      const res = await axios.post("http://localhost:5186/api/jobs", jobData, {
        headers: { "Content-Type": "application/json" } // ✅ Ensures correct request format
      });
  
      console.log("✅ Job added:", res.data);
      fetchJobs();
      setJob({ company: "", position: "", status: "Pending" });
    } catch (error) {
      console.error("❌ Error adding job:", error.response?.data?.message || error.message);
    }
  };
  
  
  
  
  
  
  

  return (
    <Container component={Paper} sx={{ padding: 2, marginBottom: 2 }}>
      <TextField label="Company" fullWidth value={job.company} onChange={(e) => setJob({ ...job, company: e.target.value })} />
      <TextField label="Position" fullWidth value={job.position} onChange={(e) => setJob({ ...job, position: e.target.value })} />
      <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }} onClick={handleSubmit}>
        Add Job
      </Button>
    </Container>
  );
}

export default JobForm;
