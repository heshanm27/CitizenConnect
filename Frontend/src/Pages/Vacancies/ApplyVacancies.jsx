import { Box, Button, CircularProgress, Container, Grid, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBudget } from "../../Api/budget.api";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import { useDropzone } from "react-dropzone";
import CustomSnackBar from "../../Components/Common/SnackBar/SnackBar";
import DefaultSVg from "../../Assets/undraw_optimize_image_re_3tb1.svg";
import { useNavigate, useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createCV } from "../../Api/cv.api";

export default function ApplyVacancies() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {id} = useParams();
  const [richText, setRichText] = useState("");
  const dropzoneRef = useRef(null);
  const editorRef = useRef(null);
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });
  const { getRootProps, getInputProps, fileRejections, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles),
    maxFiles: 1,
    multiple: true,
    accept: { "image/jpeg": [".jpeg", ".png"], "application/pdf": [".pdf"] },
    maxSize: 1000000,
  });

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      setNotify({
        isOpen: true,
        message: "You can only upload 1 file",
        type: "error",
        title: "Error",
      });
      // You can replace this with your desired action
      return;
    }
    const newFiles = Array.from(acceptedFiles);
    console.log(newFiles);
    // Add the new files to the selectedFiles array
    setSelectedFiles(newFiles);
  };
  const handleEditorChange = (content, editor) => {
    if (editorRef.current) {
      setRichText(editorRef.current.getContent());
    }
  };

  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn:createCV,
    onSuccess: (value) => {
      // setNotify({
      //   isOpen: true,
      //   message: "Submit success",
      //   title: "Success",
      //   type: "success",
      // });
      // setDialogOff();
      queryClient.invalidateQueries(["admin-budgets"]);
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
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
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
    },
    validationSchema,
    onSubmit: (values) => {
      mutate({
        first_name: values.first_name,
        last_name: values.last_name,
        nic_passport: values.nic_passport,
        dob: values.dob,
        address: values.address,
        email: values.email,
        phone: values.phone,
        coverletter: richText,
        cv: selectedFiles[0],
        vacancie: id,

      });
      navigate("/vacancies")
      console.log({
        year: values.year,
        allocated_budget: values.allocated_budget,
        spended_budget: values.spended_budget,
        unit: values.unit,
        description: richText,
      });
    },
  });
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
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
            <Box sx={{ mb: 5 }}>
              <Typography sx={{ mb: 2 }}>Cover Letter</Typography>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                onChange={handleEditorChange}
                apiKey="dzmmscs8w6nirjr0qay6mkqd0m5h0eowz658h3g6me0qe9s9"
                init={{
                  height: 400,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help" +
                    "| image",
                  content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mb: 2 }}>Upload CV</Typography>
            <Box
              sx={{
                border: `2px dashed ${isDragActive ? theme.palette.secondary.main : theme.palette.primary.main}`,
                borderRadius: theme.shape.borderRadius,
                padding: theme.spacing(2),
                textAlign: "center",
                alignItems: "center",
                cursor: "pointer",
                height: "400px",
                display: "flex", // Add display:flex
                justifyContent: "center", // Add justifyContent: center
              }}
              {...getRootProps()}
              ref={dropzoneRef}
            >
              <input {...getInputProps()} />
              {selectedFiles.length === 0 ? (
                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                  <Typography variant="body1" align="center" color="textSecondary" sx={{ my: 4 }}>
                    Drag and drop files here, or click to select files
                  </Typography>
                  <img src={DefaultSVg} alt="default image" width={"200px"} />
                </Stack>
              ) : (
                selectedFiles.map((file, index) => {
                  if (file.type === "application/pdf") {
                    return (
                      <object key={index} data={URL.createObjectURL(file)} type="application/pdf" width="50%" height="250">
                        <p>Preview not available.</p>
                      </object>
                    );
                  } else {
                    return <img key={index} src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: "100%", maxHeight: "100%" }} loading="lazy" />;
                  }
                })
              )}
            </Box>
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

        <Footer />
        <CustomSnackBar notify={notify} setNotify={setNotify} />
      </Container>
    </>
  );
}
