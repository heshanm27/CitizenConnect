import { Box, Chip, Container, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { useQuery } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import { getBudgets } from "../../Api/budget.api";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getCertificates } from "../../Api/certificate.api";
export default function DocumentDashBoard() {
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["admin-document"], queryFn: getCertificates });
  console.log(error, data, isLoading, isError);
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.fname + " " + row.lname, //access nested data with dot notation
        header: "Customer Name",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "email", //access nested data with dot notation
        header: "Email",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "certificate_type", //normal accessorKey
        header: "Certificate Type",
        enableGlobalFilter: false,
      },

      {
        accessorKey: "certificate_language", //normal accessorKey
        header: "Certificate Language",
        enableGlobalFilter: false,
        Cell: ({ renderedCellValue, row }) => row?.original?.certificate_language.map((item) => <Chip sx={{ m: 1 }} label={item} color="info" />),
      },
      {
        accessorKey: "payment.isPaid",
        header: "Payment status",
        Cell: ({ renderedCellValue, row }) =>
          row.original.payment.isPaid ? <Chip label="Approved" color="success" /> : <Chip label="Rejected" color="error" />,
      },
    ],
    []
  );
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ my: 5, fontWeight: "bold" }}>
          Documents
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
