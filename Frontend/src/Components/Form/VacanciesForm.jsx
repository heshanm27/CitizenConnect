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
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import DefaultSVg from "../../Assets/undraw_optimize_image_re_3tb1.svg";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createVacancy, updateVacancy } from "../../Api/vacancies.api";

export const VacanciesCategory = ["IT", "HR", "Human", "Worker"];
export default function VacanciesForm({ setNotify, setDialogOff, updateData }) {
  const theme = useTheme();
  const [richText, setRichText] = useState("");
  const dropzoneRef = useRef(null);
  const editorRef = useRef(null);
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { getRootProps, getInputProps, fileRejections, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => handleDrop(acceptedFiles),
    maxFiles: 1,
    multiple: true,
    accept: { "image/jpeg": [".jpeg", ".png"] },
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
    mutationFn: createVacancy,
    onSuccess: (value) => {
      setNotify({
        isOpen: true,
        message: "Submit success",
        title: "Success",
        type: "success",
      });
      setDialogOff();
      queryClient.invalidateQueries(["admin-vacancies"]);
    },
  });


  const {isLoading:isUpdateLoading,mutate:UpdateMutate } = useMutation({
    mutationFn: updateVacancy,
    onSuccess: (value) => { 
      setNotify({
        isOpen: true,
        message: "Submit success",
        title: "Success",
        type: "success",
      });
      setDialogOff();
      queryClient.invalidateQueries(["admin-vacancies"]);
    },
    onError: (error) => {
      setNotify({
        isOpen: true,
        message: error.message,
        title: "Error",
        type: "error",
      });
     }
  })
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    short_description: Yup.string().required("Short Discription is required"),
    closing_date: Yup.string().required("Vacancies Closing Date is required"),
    category:  Yup.string().required("Vacancies Category is required"),
  });

  const { values, handleSubmit, errors, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {
      title: updateData ? updateData.title : "",
      short_description: updateData ? updateData.short_description : "",
      closing_date:  "",
      category: updateData ? updateData.category : "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (updateData) {
        UpdateMutate({
          id: updateData._id,
          title: values.title,
          short_description: values.short_description,
          closing_date: values.closing_date,
          description: richText,
          thumbnail:selectedFiles.length === 0 ? ""  : selectedFiles.length >= 1 ? selectedFiles[0] : selectedFiles,
          category: values.category,
        })
       }
      mutate({
        title: values.title,
        short_description: values.short_description,
        closing_date: values.closing_date,
        description: richText,
        thumbnail: selectedFiles.length >= 1 ? selectedFiles[0] : selectedFiles,
        category: values.category,
      });
    },
  });
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} >
            <InputLabel required id="demo-simple-select-label">
              Vacancie Title
            </InputLabel>
            <TextField
              sx={{ my: 1 }}
              name="title"
              fullWidth
              inputProps={{ min: 1 }}
              error={Boolean(errors.title)}
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.title}
            />
            <Box sx={{ my: 3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: "100%" }}
                  value={values.closing_date}
                  onChange={(date) => setFieldValue("closing_date", date)}
                  renderInput={(params) => {
                    return <TextField fullWidth {...params} name="closing_date" onBlur={handleBlur} />;
                  }}
                  disablePast
                  label="Select Closing Date "
                />
              </LocalizationProvider>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} >
            <InputLabel required id="demo-simple-select-label">
              Short Description
            </InputLabel>
            <TextField
              sx={{ my: 1 }}
              name="short_description"
              fullWidth
              multiline
              error={Boolean(errors.short_description)}
              value={values.short_description}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.short_description}
            />

            <Box>
              <InputLabel sx={{ my: 1 }} required id="demo-simple-select-label">
                Select Vacancies Category
              </InputLabel>
              <FormControl fullWidth>
                <Select
                  name="category"
                
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300, // adjust the maxHeight to suit your needs
                      },
                    },
                  }}
                  displayEmpty
                  error={Boolean(errors.category)}
                  value={values.category}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {VacanciesCategory.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={Boolean(errors.category)}>
                  {errors.category ? errors.category : "Select at least one Vacanies Category"}
                </FormHelperText>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} md={12}>
            <Box sx={{ mb: 5 }}>
              <Typography sx={{ mb: 2 }}>Vacancie Description</Typography>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                onChange={handleEditorChange}
                initialValue={updateData ? updateData.description : ""}
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
          <Grid item xs={12} md={12}>
            <Typography sx={{ mb: 2 }}>Project thumbnail</Typography>
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
                  <img src={updateData?.thumbnail || DefaultSVg} alt="default image" width={"200px"} />
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
              <Typography sx={{ bgcolor: theme.palette.background.paper }} align="center" color="red">
                {error.message}
              </Typography>
            )}
            <Button sx={{ mt: 5 }} variant="contained" fullWidth onClick={handleSubmit}>
              {isUpdateLoading || isLoading ? <CircularProgress color="inherit" /> : updateData  ?"Update" : " Submit"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
