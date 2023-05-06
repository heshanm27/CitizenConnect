import { Box, Chip, Container, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { useQuery } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import { getBudgets } from "../../Api/budget.api";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getCVs } from "../../Api/cv.api";
export default function CvDashBoard() {
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["admin-cv"], queryFn: getCVs });
  console.log(error, data, isLoading, isError);
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.first_name + " " + row.last_name, //access nested data with dot notation
        header: "Candidate Name",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "email", //normal accessorKey
        header: "Candidate Email",
        Cell: ({ renderedCellValue, row }) => {
          return "$" + row.original.allocated_budget + " " + row.original.unit;
        },
      },
      {
        accessorKey: "nic_passport", //normal accessorKey
        header: "Candidate NIC/PASSPORT",
        Cell: ({ renderedCellValue, row }) => {
          return "$" + row.original.spended_budget + " " + row.original.unit;
        },
      },
      {
        accessorKey: "dob", //access nested data with dot notation
        header: "DOB",
        enableGlobalFilter: false,
        Cell: ({ renderedCellValue, row }) => {
          return new Date(row.original.dob).getFullYear();
        },
      },
    ],
    []
  );
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mt: 5, fontWeight: "bold" }}>
          Live Order
        </Typography>

        <MaterialReactTable
          positionActionsColumn="last"
          muiTopToolbarProps={{
            sx: {
              p: 2,
              justifyContent: "end",
            },
          }}
          localization={{
            noRecordsToDisplay: "No records to display",
          }}
          enableEditing
          onEditingRowSave={() => {}}
          onEditingRowCancel={() => {}}
          state={{
            isLoading,
            showAlertBanner: isError,
          }}
          rowCount={data?.length ?? 0}
          columns={columns}
          data={data ?? []}
          muiToolbarAlertBannerProps={
            isError
              ? {
                  color: "error",
                  children: "Error occured while loading data",
                }
              : undefined
          }
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={(e) => handleClick(e, row?.original?._id)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="left" title="Delete">
                <IconButton color="error" onClick={(e) => handleClick(e, row?.original?._id)}>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      </Container>
    </>
  );
}
