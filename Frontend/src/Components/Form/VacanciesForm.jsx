import { Box, Container, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Editor } from "@tinymce/tinymce-react";

export const VacanciesCategory = ["IT", "HR", "Human", "Worker"];

export default function BudgetForm() {
  const [richText, setRichText] = useState("");
  const editorRef = useRef(null);
  const years = [];
  for (let year = new Date().getFullYear(); year >= 1950; year--) {
    years.push(year);
  }
  const handleEditorChange = (content, editor) => {
    if (editorRef.current) {
      setRichText(editorRef.current.getContent());
    }
  };
  const validationSchema = Yup.object().shape({
    spended_budget: Yup.string().required("Product Brand is required"),
    allocated_budget: Yup.number().required("Product Price is required").min(1, "Minimum value is 1").max(100000, "Maximum value is 100000"),
    unit: Yup.number().required("Product Quantity is required").min(1, "Minimum value is 0").max(10000, "Maximum value is 10000"),
    description: Yup.string().required("Product Name is required"),
  });

  const { values, handleSubmit, errors, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues: {
      productName: "",
      productBrand: "",
      productPrice: 1,
      productQuantity: 1,
      mainCategory: "",
      subCategory: [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(selectedFiles);
      productMutatuion.mutate({
        name: values.productName,
        price: values.productPrice,
        stock: values.productQuantity,
        category: values.mainCategory,
        subCategory: values.subCategory,
        description: richText,
        images: selectedFiles,
        brand: values.productBrand,
      });
    },
  });
  return (
    <Container maxWidth="lg">
      <Stack direction={"column"} spacing={2}>
        <Box>
          <InputLabel sx={{ my: 2 }} required id="demo-simple-select-label">
            Budget Year
          </InputLabel>
          <FormControl fullWidth>
            <Select
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300, // adjust the maxHeight to suit your needs
                  },
                },
              }}
              displayEmpty
              value={""}
              onChange={""}
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
          </FormControl>
        </Box>
        <InputLabel sx={{ mb: 2 }} required id="demo-simple-select-label">
          Allocated Budget
        </InputLabel>
        <TextField />
        <Box>
          <InputLabel sx={{ mb: 2 }} required id="demo-simple-select-label">
            Spended Budget
          </InputLabel>
          <TextField fullWidth />
        </Box>
        <InputLabel sx={{ my: 2 }} required id="demo-simple-select-label">
          Unit
        </InputLabel>
        <FormControl fullWidth>
          <Select displayEmpty labelId="demo-simple-select-label" id="demo-simple-select" value={""} onChange={""}>
            <MenuItem value="million">thousand</MenuItem>
            <MenuItem value="million">million</MenuItem>
            <MenuItem value="million">billion</MenuItem>
          </Select>
        </FormControl>

        <Box>
          <Typography sx={{ mb: 2 }}>Budget Description</Typography>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
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
      </Stack>
    </Container>
  );
}
