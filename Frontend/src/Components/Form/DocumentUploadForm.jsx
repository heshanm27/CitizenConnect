import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    InputLabel,
    Link,
    Stack,
    TextField,
    Typography,
    useTheme,
  } from "@mui/material";
  import React, { useRef, useState } from "react";
  import * as Yup from "yup";
  import { useFormik } from "formik";
  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  import { useDropzone } from "react-dropzone";
  import DefaultSVg from "../../Assets/undraw_optimize_image_re_3tb1.svg";
  import { createProject, updateProject } from "../../Api/project.api";
  import { getBudgets } from "../../Api/budget.api";
import { completeCertificateOrder } from "../../Api/certificate.api";
  
  export const ProjectCategoryTypes = ["politics", "business", "entertainment", "sports", "technology"];
  
  export default function DocumentUploadForm({ setNotify, setDialogOff, updateData }) {
    const theme = useTheme();
    const dropzoneRef = useRef(null);
    const editorRef = useRef(null);
    const queryClient = useQueryClient();
    const [selectedFiles, setSelectedFiles] = useState([]);
console.log("updaae",updateData)

    const { getRootProps, getInputProps, fileRejections, isDragActive } = useDropzone({
      onDrop: (acceptedFiles) => handleDrop(acceptedFiles),
      maxFiles: 3,
      multiple: true,
      accept: {  "application/pdf": [".pdf"] },
      maxSize: 1000000,
    });
  
    const handleDrop = (acceptedFiles) => {
      if (acceptedFiles.length > 3) {
        setNotify({
          isOpen: true,
          message: "You can only upload 3 file",
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
    const { isLoading, isError, error, mutate } = useMutation({
      mutationFn: completeCertificateOrder,
      onSuccess: (value) => {
        setNotify({
          isOpen: true,
          message: "Submit success",
          title: "Success",
          type: "success",
        });
        setDialogOff();
        queryClient.invalidateQueries(["admin-document"]);
      },
      onError: (error) => {
        console.log(error);
        setNotify({
          isOpen: true,
          message: error?.response?.data?.message || "Something went wrong",
          title: "Error",
          type: "error",
        });
      },
    });
  
    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Title is required").email("Invalid email address"),
     
    });
  
    const { values, handleSubmit, errors, handleBlur, handleChange, setFieldValue } = useFormik({
      initialValues: {
       email:updateData?.email || "",
      },
      validationSchema,
      onSubmit: (values) => {
        mutate({
          id: updateData?._id,
          email: values.email,
          files: selectedFiles,
        })
        
      queryClient.invalidateQueries(["admin-document"]);
        setNotify({
          isOpen: true,
          message: "Submit success",
          title: "Success",
        })
      },
      onError: (error) => { 
        console.log(error)
        setNotify({
          isOpen: true,
          message: error?.response?.data?.message || "Something went wrong",
          title: "Error",
        })
      },
    });
  


    return (
      <>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} spacing={2}>
              <InputLabel required id="demo-simple-select-label">
               Customer Email
              </InputLabel>
              <TextField
                sx={{ my: 1 }}
                name="email"
                fullWidth
                inputProps={{ min: 1 }}
                error={Boolean(errors.email)}
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.email}
              />
  
         
                     </Grid>

            <Grid item xs={12} md={12}>
              <Typography sx={{ mb: 2 }}>Upload Files</Typography>
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
                    <img src={ DefaultSVg} alt="default image" width={"200px"} />
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

                      return <img key={index} src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: "25%", maxHeight: "25%" }} loading="lazy" />;
                    }
                  })
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              {isError && (
                <Typography sx={{ bgcolor: theme.palette.background.paper }} align="center" color="red">
                  {error.message}
                </Typography>
              )}
              <Button sx={{ mt: 5 }} variant="contained" fullWidth onClick={handleSubmit}>
          
                { isLoading  ? <CircularProgress color="inherit" /> :  " Submit"}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
  