import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import DownloadIcon from '@mui/icons-material/Download';

export default function CVView({ cvdata }) {

  const handleDownloadPDF = () => {
    // Replace the URL with the actual PDF URL
    const pdfURL = cvdata?.cv;
    window.open(pdfURL, "_blank");
  };
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Applicant Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Typography variant="body1" gutterBottom>
            {" "}
            First Name: {cvdata.first_name + cvdata.last_name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            NIC/Passport: {cvdata.nic_passport}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            Email: {cvdata.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            Phone: {cvdata.phone}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            Date of Birth: {cvdata.dob}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            Cover Letter: {cvdata.cover_letter}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {" "}
            Address: {cvdata.address}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button startIcon={<DownloadIcon/>} onClick={handleDownloadPDF}>Download PDF</Button>
        </Grid>
      </Grid>

      {/* <Typography variant="h6" component="h2" gutterBottom>
        Applicant Details
      </Typography>
      <Typography variant="body1" gutterBottom>
        First Name: {firstName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Last Name: {lastName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        NIC/Passport: {nicPassport}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Phone: {phone}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Date of Birth: {dob}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Cover Letter: {coverLetter}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Address: {address}
      </Typography> */}
    </Paper>
  );
}
