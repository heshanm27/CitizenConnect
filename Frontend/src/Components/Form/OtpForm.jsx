import { Button, CircularProgress, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createNews } from "../../Api/news.api";
import { MuiOtpInput } from 'mui-one-time-password-input'
import { requestOTP, validateOTP } from "../../Api/otpApi";
import { useDispatch } from "react-redux";
import { validOtp } from "../../Redux/otp.slice";

export const NEWSCategoryTypes = ["politics", "business", "entertainment", "sports", "technology"];

export default function OtpForm({ setNotify, setDialogOff,email }) {
  const [otp, setOtp] = React.useState('')
  const disPatch = useDispatch()
  const [isLoader, setIsLoader] = React.useState(false)
  const handleOtpChange = (newValue) => {
    setOtp(newValue)
  }



  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: validateOTP,
    onSuccess: (value) => {
      setNotify({
        isOpen: true,
        message: "OTP verified successfully",
        type: "success",
        title: "Success",
      });
      setDialogOff(false)
    },
    onError: (err) => { 
      setNotify({
        isOpen: true,
        message: err?.message,
        type: "error",
        title: "Error",
      });
    }
  });
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    // otp: Yup.string().length(4).optional(),
  });

  const { values, handleSubmit, errors, handleBlur, handleChange, setFieldValue,isValid,validateField } = useFormik({
    initialValues: {
      email: email || "",
    },
    validationSchema,
    onSubmit: (values) => {
      if(otp.length === 4){
        mutate({
          email: values.email,
          otp: otp
        });
        disPatch(validOtp())
      } else {
        setNotify({
          isOpen: true,
          message: "OTP should be 4 digit",
          type: "error",
          title: "Error",
        });
      }
     
    },
  });

  const handleOTP = () => {
    if (isValid) {
      setIsLoader(true)
      requestOTP(values.email).then((res) => {
        console.log(res);
        setNotify({
          isOpen: true,
          message: "OTP sent successfully",
          type: "success",
          title: "Success",
        });
        setIsLoader(false)
      
      }).catch((err) => { 
        setNotify({
          isOpen: true,
          message: err?.message,
          type: "error",
          title: "Error",
        });
        setIsLoader(false)
      });
    } else {
      setIsLoader(false)
      validateField("email")
    }
   
   }
  return (
    <>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} spacing={2}>
            <Stack justifyContent="end"
                alignItems="end"
                spacing={2}>
            <TextField
             
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
              <Button onClick={handleOTP}>{isLoader ? <CircularProgress/> : "Send OTP"}</Button>
            </Stack>
            </Grid>
            <Grid item xs={12} md={12} spacing={2}>
            <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
              <Typography variant="h6">Enter the OTP sent to your email</Typography>
            </Stack>
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
