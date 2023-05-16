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
import { createNews } from "../../Api/news.api";

export const NEWSCategoryTypes = ["politics", "business", "entertainment", "sports", "technology"];

export default function NewsForm({ setNotify, setDialogOff, updatData }) {
  const theme = useTheme();
  const [richText, setRichText] = useState("sdsdsd");
  const dropzoneRef = useRef(null);
  const editorRef = useRef(null);
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState([]);
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
    mutationFn: createNews,
    onSuccess: (value) => {
      setNotify({
        isOpen: true,
        message: "Submit success",
        title: "Success",
        type: "success",
      });
      setDialogOff();
      queryClient.invalidateQueries(["admin-news"]);
    },
  });
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("News title is required"),
    short_description: Yup.string().required("News short discription is required"),
    news_category: Yup.array().of(Yup.string()).min(1, "At least one news type is required"),
  });

  const { values, handleSubmit, errors, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {
      title: updatData?.title || "",
      short_description: updatData?.short_description || "",
      news_category: updatData?.news_category || [""],
    },
    validationSchema,
    onSubmit: (values) => {
      mutate({
        title: values.title,
        short_description: values.short_description,
        description: richText,
        news_category: values.news_category,
        thumbnail: selectedFiles.length >= 1 ? selectedFiles[0] : selectedFiles,
      });
    },
  });
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} spacing={2}>
            <TextField
              sx={{ my: 2 }}
              name="title"
              label="News Title"
              fullWidth
              inputProps={{ min: 1 }}
              error={Boolean(errors.title)}
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.title}
            />

            <Box>
              <InputLabel sx={{ my: 1 }} required id="demo-simple-select-label">
                News Type
              </InputLabel>
              <FormControl fullWidth>
                <Select
                  name="news_category"
                  multiple
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300, // adjust the maxHeight to suit your needs
                      },
                    },
                  }}
                  displayEmpty
                  error={Boolean(errors.news_category)}
                  value={values.news_category}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {/* <MenuItem disabled value="">
                    <em>None</em>
                  </MenuItem> */}
                  {NEWSCategoryTypes.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={Boolean(errors.news_category)}>{errors.news_category ? errors.news_category : "Select News Category"}</FormHelperText>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              sx={{ my: 2 }}
              name="short_description"
              multiline
              label="Short Description"
              fullWidth
              inputProps={{ min: 1 }}
              error={Boolean(errors.short_description)}
              value={values.short_description}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.short_description}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ mb: 5 }}>
              <Typography sx={{ mb: 2 }}>News Description</Typography>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={updatData?.description || ""}
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
          <Grid item xs={12} md={12}>
            <Typography sx={{ mb: 2 }}>Upload Thumbnail</Typography>
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
                  <img src={updatData?.thumbnail ?? DefaultSVg} alt="default image" width={"200px"} />
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
      </Container>
    </>
  );
}
