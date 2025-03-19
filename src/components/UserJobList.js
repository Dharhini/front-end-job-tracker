import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

function UserJobList({ jobs }) {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      {jobs.length === 0 ? (
        <Typography variant="h6" sx={{ padding: 2, textAlign: "center" }}>
          No jobs found.
        </Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.position}</TableCell>
                <TableCell>{job.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}

export default UserJobList;
