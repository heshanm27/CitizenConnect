import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBudget, updateBudget } from "../../Api/budget.api";
export default function BudgetForm({ setNotify, setDialogOff, updateData }) {
  const [richText, setRichText] = useState("");
  const editorRef = useRef(null);
  const queryClient = useQueryClient();
  const years = [];
  for (let year = new Date().getFullYear(); year >= 1950; year--) {
    years.push(year);
  }
  const handleEditorChange = (content, editor) => {
    if (editorRef.current) {
      setRichText(editorRef.current.getContent());
    }
  };

  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: createBudget,
    onSuccess: (value) => {
      setNotify({
        isOpen: true,
        message: "Submit success",
        title: "Success",
        type: "success",
      });
      setDialogOff();
      queryClient.invalidateQueries(["admin-budgets"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateBudget,
    onSuccess: (value) => {
      setNotify({
        isOpen: true,
        message: "Update success",
        title: "Success",
        type: "success",
      });
      setDialogOff();
      queryClient.invalidateQueries(["admin-budgets"]);
    },
    onError: (error) => {
      setNotify({
        isOpen: true,
        message: "Update failed",
        title: error?.message,
        type: "error",
      });
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
      year: updateData?.year || "",
      allocated_budget: updateData?.allocated_budget || "",
      spended_budget: updateData?.spended_budget || "",
      unit: updateData?.unit || "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (updateData) {
        updateMutation.mutate({
          id: updateData._id,
          year: values.year,
          allocated_budget: values.allocated_budget,
          spended_budget: values.spended_budget,
          unit: values.unit,
          description: richText,
        });
      } else {
        mutate({
          year: values.year,
          allocated_budget: values.allocated_budget,
          spended_budget: values.spended_budget,
          unit: values.unit,
          description: richText,
        });
      }
    },
  });

  return (
    <Container maxWidth="lg">
      <Stack direction={"column"} spacing={3}>
        <Box>
          <InputLabel sx={{ my: 2 }} required id="demo-simple-select-label">
            Budget Year
          </InputLabel>
          <FormControl fullWidth>
            <Select
              name="year"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300, // adjust the maxHeight to suit your needs
                  },
                },
              }}
              displayEmpty
              error={Boolean(errors.year)}
              value={values.year}
              onBlur={handleBlur}
              //   onChange={(option) => {
              //     setFieldValue("year", option.value);
              //   }}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={Boolean(errors.year)}>{errors.year ? errors.year : "Enter budget year"}</FormHelperText>
          </FormControl>
        </Box>
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
        <Box>
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

        <Box sx={{ mb: 5 }}>
          <Typography sx={{ mb: 2 }}>Budget Description</Typography>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={updateData?.description}
            onChange={handleEditorChange}
            apiKey="dzmmscs8w6nirjr0qay6mkqd0m5h0eowz658h3g6me0qe9s9"
            init={{
              height: 500,
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
        {isError && (
          <Typography align="center" color="red">
            {error.message}
          </Typography>
        )}
        <Button sx={{ mt: 5 }} variant="contained" fullWidth onClick={handleSubmit}>
          {updateMutation.isLoading || isLoading ? <CircularProgress /> : updateData ? "Update" : " Submit"}
        </Button>
      </Stack>
    </Container>
  );
}
