import { Paper, Typography } from '@mui/material'
import React from 'react'

export default function CVView(cvdata) {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" component="h2" gutterBottom>
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
      </Typography>
    </Paper>
  )
}
