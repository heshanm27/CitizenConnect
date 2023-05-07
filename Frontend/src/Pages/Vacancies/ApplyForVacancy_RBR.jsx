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
export default function ApplyVacancies() {
  const theme = useTheme();
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
    mutationFn: createBudget,
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
    year: Yup.string().required("Year is required"),
    allocated_budget: Yup.number().required("Allocated Budget is required").min(1, "Minimum value is 1"),
    spended_budget: Yup.number().required("Spended Budgetis required").min(1, "Minimum value is 1"),
    unit: Yup.string().required("Unit is required"),
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
      coverletter: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate({
        year: values.year,
        allocated_budget: values.allocated_budget,
        spended_budget: values.spended_budget,
        unit: values.unit,
        description: richText,
      });
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
              error={Boolean(errors.allocated_budget)}
              value={values.allocated_budget}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.allocated_budget}
            />

            <TextField
              sx={{ my: 3 }}
              name="nic_passport"
              label="NIC/PASSPORT"
              fullWidth
              inputProps={{ min: 1 }}
              error={Boolean(errors.allocated_budget)}
              value={values.allocated_budget}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.allocated_budget}
            />

            <TextField
              sx={{ my: 3 }}
              name="email"
              label="Address"
              fullWidth
              multiline
              inputProps={{ min: 1 }}
              error={Boolean(errors.allocated_budget)}
              value={values.allocated_budget}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.allocated_budget}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ my: 3 }}
              name="last_name"
              label="Last Name"
              fullWidth
              inputProps={{ min: 1 }}
              error={Boolean(errors.allocated_budget)}
              value={values.allocated_budget}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.allocated_budget}
            />

            <TextField
              sx={{ my: 3 }}
              name="email"
              label="Email"
              fullWidth
              inputProps={{ min: 1 }}
              error={Boolean(errors.allocated_budget)}
              value={values.allocated_budget}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.allocated_budget}
            />

            <TextField
              sx={{ my: 3 }}
              name="email"
              label="Phone NO"
              fullWidth
              inputProps={{ min: 1 }}
              error={Boolean(errors.allocated_budget)}
              value={values.allocated_budget}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.allocated_budget}
            />
            <TextField
              sx={{ my: 2 }}
              name="email"
              label="Date of Birth"
              fullWidth
              multiline
              inputProps={{ min: 1 }}
              error={Boolean(errors.allocated_budget)}
              value={values.allocated_budget}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.allocated_budget}
            />
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
