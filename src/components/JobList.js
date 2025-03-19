import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from "@mui/material";
import axios from "axios";

function JobList({ jobs, fetchJobs, setEditingJob }) {
  const handleStatusChange = async (id, newStatus) => {
    await axios.put(`http://localhost:5186/api/jobs/${id}`, { ...jobs.find(j => j.id === id), status: newStatus });
    fetchJobs();
  };

  return (
    <TableContainer component={Paper} className="job-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.position}</TableCell>
              <TableCell>
                <Select
                  value={job.status}
                  onChange={(e) => handleStatusChange(job.id, e.target.value)}
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Shortlisted">Shortlisted</MenuItem>
                  <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
                  <MenuItem value="Selected">Selected</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => setEditingJob(job)}>Edit</Button>
                <Button variant="outlined" color="error" onClick={() => axios.delete(`http://localhost:5186/api/jobs/${job.id}`).then(fetchJobs)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default JobList;
