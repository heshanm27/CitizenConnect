import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import DefaultSVg from "../../Assets/undraw_optimize_image_re_3tb1.svg";
import { createProject, updateProject } from "../../Api/project.api";
import { getBudgets } from "../../Api/budget.api";

export const ProjectCategoryTypes = ["politics", "business", "entertainment", "sports", "technology"];

export default function ProjectForm({ setNotify, setDialogOff, updateData }) {
  const theme = useTheme();
  const [richText, setRichText] = useState("");
  const dropzoneRef = useRef(null);
  const editorRef = useRef(null);
  const queryClient = useQueryClient();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const years = [];
  for (let year = new Date().getFullYear(); year >= 1950; year--) {
    years.push(year);
  }

  const {
    data,
    isLoading: isYearLoading,
    isError: isYearLoadError,
  } = useQuery({
    queryKey: ["admin-budget-year"],
    queryFn: getBudgets,
  });
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
    mutationFn: createProject,
    onSuccess: (value) => {
      setNotify({
        isOpen: true,
        message: "Submit success",
        title: "Success",
        type: "success",
      });
      setDialogOff();
      queryClient.invalidateQueries(["admin-project"]);
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

  const {
    isLoading: isUpdateLoading,
    isError: isUpdateError,
    error: updateError,
    mutate: updateMutate,
  } = useMutation({
    mutationFn: updateProject,
    onSuccess: (value) => {
      setNotify({
        isOpen: true,
        message: "Submit success",
        title: "Success",
        type: "success",
      });
      setDialogOff();
      queryClient.invalidateQueries(["admin-project"]);
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
    title: Yup.string().required("Title is required"),
    year_of_allocation: Yup.string().required("Allocation year is required"),
    project_owner: Yup.string().required("Project Owner is required"),
    allocated_budget: Yup.number().required("Allocated Budget is required").min(1, "Minimum value is 1"),
    spended_budget: Yup.number().required("Spended Budgetis required").min(1, "Minimum value is 1"),
    unit: Yup.string().required("Unit is required"),
    category: Yup.string().required("Project Category is required"),
  });

  const { values, handleSubmit, errors, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {
      title: updateData?.title || "",
      year_of_allocation: updateData?.year_of_allocation || "",
      project_owner: updateData?.project_owner || "",
      allocated_budget: updateData?.allocated_budget || "",
      spended_budget: updateData?.spended_budget || "",
      unit: updateData?.unit || "",
      category: updateData?.category || "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (updateData) {
        updateMutate({
          id: updateData._id,
          title: values.title,
          allocated_budget: values.allocated_budget,
          spended_budget: values.spended_budget,
          unit: values.unit,
          year_of_allocation: values.year_of_allocation,
          project_owner: values.project_owner,
          description: richText || updateData.description,
          thumbnail:selectedFiles.length === 0 ? null  : selectedFiles.length >= 1 ? selectedFiles[0] : selectedFiles,
          category: values.category,
        });
      } else {
        mutate({
          title: values.title,
          allocated_budget: values.allocated_budget,
          spended_budget: values.spended_budget,
          unit: values.unit,
          year_of_allocation: values.year_of_allocation,
          project_owner: values.project_owner,
          description: richText,
          thumbnail:  selectedFiles.length >= 1 ? selectedFiles[0] : selectedFiles,
          category: values.category,
        });
      }
    },
  });

  if (data?.length === 0) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          Please create budget year before creating project
        </Typography>
        <Link href="/admin/budget">Visit</Link>
      </Box>
    );
  }
  console.log("Budget Year", data);
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} spacing={2}>
            <InputLabel required id="demo-simple-select-label">
              Project Title
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

            <Box>
              <InputLabel sx={{ my: 2 }} required id="demo-simple-select-label">
                Budget Year
              </InputLabel>
              <FormControl fullWidth>
                <Select
                  name="year_of_allocation"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300, // adjust the maxHeight to suit your needs
                      },
                    },
                  }}
                  displayEmpty
                  error={Boolean(errors.year_of_allocation)}
                  value={values.year_of_allocation}
                  onBlur={handleBlur}
                  //   onChange={(option) => {
                  //     setFieldValue("year", option.value);
                  //   }}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {data?.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.year}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={Boolean(errors.year)}>{errors.year ? errors.year : "Enter budget year"}</FormHelperText>
              </FormControl>
            </Box>

            <InputLabel sx={{ my: 2 }} required id="demo-simple-select-label">
              Unit
            </InputLabel>
            <FormControl fullWidth>
              <Select
                name="unit"
                displayEmpty
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                error={Boolean(errors.unit)}
                value={values.unit}
                onBlur={handleBlur}
                // onChange={(option) => {
                //   setFieldValue("unit", option.value);
                // }}
                onChange={handleChange}
              >
                <MenuItem value="thousand">thousand</MenuItem>
                <MenuItem value="million">million</MenuItem>
                <MenuItem value="billion">billion</MenuItem>
              </Select>
              <FormHelperText sx={{ mt: 2 }} error={Boolean(errors.unit)}>
                {errors.unit ? errors.unit : "Enter what unit you used to enter Allocated Budget & Spended Budget"}{" "}
              </FormHelperText>
            </FormControl>

            <Box>
              <InputLabel sx={{ my: 1 }} required id="demo-simple-select-label">
                Select Project Category
              </InputLabel>
              <FormControl fullWidth>
                <Select
                  name="category"
                  fullWidth
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
                  {/* <MenuItem disabled value="">
                    <em>None</em>
                  </MenuItem> */}
                  {ProjectCategoryTypes.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={Boolean(errors.category)}>
                  {errors.category ? errors.category : "Select at least one Projecct Category"}
                </FormHelperText>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} spacing={2}>
            <InputLabel required id="demo-simple-select-label">
              Project Owner
            </InputLabel>
            <TextField
              sx={{ my: 1 }}
              name="project_owner"
              fullWidth
              inputProps={{ min: 1 }}
              error={Boolean(errors.project_owner)}
              value={values.project_owner}
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.project_owner}
            />
            <Box sx={{ my: 3 }}>
              <InputLabel sx={{ mb: 2 }} required id="demo-simple-select-label">
                Allocated Budget
              </InputLabel>
              <TextField
                name="allocated_budget"
                type="number"
                fullWidth
                inputProps={{ min: 1 }}
                error={Boolean(errors.allocated_budget)}
                value={values.allocated_budget}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.allocated_budget}
              />
            </Box>
            <Box sx={{ my: 3 }}>
              <InputLabel sx={{ mb: 2 }} required id="demo-simple-select-label">
                Spended Budget
              </InputLabel>
              <TextField
                name="spended_budget"
                type="number"
                fullWidth
                inputProps={{ min: 1 }}
                error={Boolean(errors.spended_budget)}
                value={values.spended_budget}
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={errors.spended_budget}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={12}>
            <Box sx={{ mb: 5 }}>
              <Typography sx={{ mb: 2 }}>Project Description</Typography>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={updateData ? updateData.description : ""}
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
        
              {isUpdateLoading|| isLoading  ? <CircularProgress color="inherit" /> : updateData ? "Update" : " Submit"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
