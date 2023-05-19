import { Button, CircularProgress, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createNews } from "../../Api/news.api";
import { MuiOtpInput } from 'mui-one-time-password-input'

export const NEWSCategoryTypes = ["politics", "business", "entertainment", "sports", "technology"];

export default function OtpForm({ setNotify, setDialogOff,email }) {
  const [otp, setOtp] = React.useState('')

  const handleOtpChange = (newValue) => {
    setOtp(newValue)
  }



  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: createNews,
    onSuccess: (value) => {},
  });
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    // otp: Yup.string().length(4).optional(),
  });

  const { values, handleSubmit, errors, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {
      email: email || "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate({
        email: values.email,
      });
    },
  });
  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} spacing={2}>
            <TextField
              sx={{ my: 3 }}
              name="email"
              label="Email"
              fullWidth
              inputProps={{ min: 1 }}
              error={Boolean(errors.email)}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.email}
            />
            <MuiOtpInput length={4}   value={otp} onChange={handleOtpChange} />
            {/* <TextField
              name="otp"
              label="Otp"
              type="number"
              fullWidth
              inputProps={{ min: 1 }}
              error={Boolean(errors.number_of_copy)}
              value={values.number_of_copy}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.number_of_copy}
            /> */}
          </Grid>

          <Grid item xs={12} md={12}>
            {isError && (
              <Typography align="center" color="red">
                {error.message}
              </Typography>
            )}
            <Button sx={{ mt: 5 }} variant="contained" fullWidth onClick={handleSubmit}>
              {isLoading ? <CircularProgress /> : " Submit"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
