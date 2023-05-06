import { Box, Chip, Container, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { useQuery } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getProjects } from "../../Api/project.api";
export default function ProjectDashBoard() {
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["admin-budgets"], queryFn: getProjects });
  console.log(error, data, isLoading, isError);
  const columns = useMemo(
    () => [
      {
        accessorKey: "year", //access nested data with dot notation
        header: "#Year",
        enableGlobalFilter: false,
        Cell: ({ renderedCellValue, row }) => {
          return new Date(row.original.year_of_allocation).getFullYear();
        },
      },
      {
        accessorKey: "title",
        header: "Project Title",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "project_owner",
        header: "Project Owner",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "allocated_budget", //normal accessorKey
        header: "Allocated Budget",
        Cell: ({ renderedCellValue, row }) => {
          return "$" + row.original.allocated_budget + " " + row.original.unit;
        },
      },
      {
        accessorKey: "spended_budget", //normal accessorKey
        header: "Spended Budget",
        Cell: ({ renderedCellValue, row }) => {
          return "$" + row.original.spended_budget + " " + row.original.unit;
        },
      },
    ],
    []
  );
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ my: 5, fontWeight: "bold" }}>
          Project
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
