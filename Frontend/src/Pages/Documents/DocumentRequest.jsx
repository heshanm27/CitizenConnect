import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBudget } from "../../Api/budget.api";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import CustomSnackBar from "../../Components/Common/SnackBar/SnackBar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createCertificate } from "../../Api/certificate.api";
import CustomeDialog from "../../Components/Common/CustomDialog/CustomDialog";
import OtpForm from "../../Components/Form/OtpForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const LANUAGES = ["English", "Sinhala", "TAMIL"];

export default function DocumentRequest() {
  const theme = useTheme();
  const isEmailVerified = useSelector((state) => state.otpSlice.isEmailVerified);
  const { doc } = useParams();
  const [addDialog, setAddDialog] = useState(false);
  const queryClient = useQueryClient();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });
console.log("isEmailVerified", isEmailVerified)
  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: createCertificate,
    onSuccess: (value) => {
      setNotify({
        isOpen: true,
        message: "Submit success",
        title: "Success",
        type: "success",
      });
    },
    onError: (error) => {
      setNotify({
        isOpen: true,
        message: "Error occured while submiting",
        title: "Error",
        type: "error",
      });
    },
  });
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    nic_passport: Yup.string()
      .required("NIC/Passport No is required")
      .test("len", "NIC/Passport No must be 10 or 12 characters", (val) => val && (val.length === 10 || val.length === 12)),
    dob: Yup.string().required("Date of birth is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\+?\d{10,14}$/, "Phone number must be a valid international phone number"),
    certificate_language: Yup.array().of(Yup.string()).min(1, "At least one language type is required"),
  });

  const { values, handleSubmit, errors, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      nic_passport: "",
      dob: "",
      address: "",
      email: "",
      phone: "",
      certificate_language: [],
      //   number_of_copy:1,
    },
    validationSchema,
    onSubmit: (values) => {
      mutate({
        fname: values.first_name,
        lname: values.last_name,
        nic_passport: values.nic_passport,
        dob: values.dob,
        address: values.address,
        email: values.email,
        phone: values.phone,
        certificate_language: values.certificate_language,
        certificate_type: doc,
      });
    },
  });
  return (
    <>
      <Navbar />
      <Container
        maxWidth="lg"
        sx={{ height: "80vh", textAlign: "center", flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Box sx={{ my: 4 }}>
            <Typography variant="h3">Requesting {doc.charAt(0).toUpperCase() + doc.slice(1)} Ceritificate</Typography>
            <Typography textAlign={"center"} variant="caption" sx={{ mt: 5 }}>
              Still only avaliable digital version(PDF)
            </Typography>
          </Box>{" "}
          <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
            <Grid item xs={12} md={6} spacing={2}>
              <TextField
                sx={{ my: 3 }}
                name="first_name"
                label="First Name"
                fullWidth
                inputProps={{ min: 1 }}
                error={Boolean(errors.first_name)}
                value={values.first_name}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.first_name}
              />

              <TextField
                sx={{ my: 3 }}
                name="nic_passport"
                label="NIC/PASSPORT"
                fullWidth
                inputProps={{ min: 1 }}
                error={Boolean(errors.nic_passport)}
                value={values.nic_passport}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.nic_passport}
              />

              <TextField
                sx={{ my: 3 }}
                name="address"
                label="Address"
                fullWidth
                multiline
                inputProps={{ min: 1 }}
                error={Boolean(errors.address)}
                value={values.address}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.address}
              />
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%" }}
                    value={values.dob}
                    onChange={(date) => setFieldValue("dob", date)}
                    renderInput={(params) => {
                      return <TextField fullWidth {...params} name="dob" onBlur={handleBlur} />;
                    }}
                    disableFuture
                    label="Enter DOB "
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                sx={{ my: 3 }}
                name="last_name"
                label="Last Name"
                fullWidth
                inputProps={{ min: 1 }}
                error={Boolean(errors.last_name)}
                value={values.last_name}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.last_name}
              />

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

              <TextField
                sx={{ my: 3 }}
                name="phone"
                label="Phone NO"
                fullWidth
                inputProps={{ min: 1 }}
                error={Boolean(errors.phone)}
                value={values.phone}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.phone}
              />

              {/* <TextField
                          name="number_of_copy"
                          label="Number Of Copies"
            type="number"
            fullWidth
            inputProps={{ min: 1 }}
            error={Boolean(errors.number_of_copy)}
            value={values.number_of_copy}
            onBlur={handleBlur}
            onChange={handleChange}
            helperText={errors.number_of_copy}
          /> */}

              <Box>
                <InputLabel sx={{ my: 1, textAlign: "left" }} required id="demo-simple-select-label">
                  Certificate Language
                </InputLabel>
                <FormControl fullWidth>
                  <Select
                    name="certificate_language"
                    multiple
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300, // adjust the maxHeight to suit your needs
                        },
                      },
                    }}
                    displayEmpty
                    error={Boolean(errors.certificate_language)}
                    value={values.certificate_language}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    {LANUAGES.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error={Boolean(errors.certificate_language)}>
                    {errors.certificate_language ? errors.certificate_language : "Select News Category"}
                  </FormHelperText>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              {isError && (
                <Typography align="center" color="red">
                  {error.message}
                </Typography>
              )}
              <Button sx={{ mt: 5 }} variant="contained" fullWidth onClick={() => setAddDialog(true)}>
                {" Verify Email"}
              </Button>
              <Button disabled={isEmailVerified ? false :true } sx={{ mt: 5 }} variant="contained" fullWidth onClick={handleSubmit}>
                {isLoading ? <CircularProgress /> : "Order Certificate"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <CustomSnackBar notify={notify} setNotify={setNotify} />
        <CustomeDialog size={"sm"} open={addDialog} setOpen={() => setAddDialog(false)} title={"Verify Otp"}>
          <OtpForm setDialogOff={() => setAddDialog(false)} setNotify={setNotify} email={values?.email} />
        </CustomeDialog>
      </Container>

      <Footer />
    </>
  );
}
