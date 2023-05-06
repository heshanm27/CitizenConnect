import { Box, Button, Container, IconButton, Tooltip, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import { getBudgets, deleteBudget } from "../../Api/budget.api";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ConfirmDialog from "../../Components/Common/ConfirmDialog/ConfirmDialog";
import CustomSnackBar from "../../Components/Common/SnackBar/SnackBar";
import CustomeDialog from "../../Components/Common/CustomDialog/CustomDialog";
import BudgetForm from "../../Components/Form/BudgetForm";
export default function BudgetDashBoard() {
  const queryClient = useQueryClient();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [docID, setDocID] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["admin-budgets"], queryFn: getBudgets });
  const {
    isLoading: deleteLoading,
    error: deleteError,
    mutate,
  } = useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-budgets"]);
      setConfirmDialog(false);
      setNotify({
        isOpen: true,
        message: "Delete success",
        title: "Success",
        type: "success",
      });
    },
    onError: () => {
      setNotify({
        isOpen: true,
        message: "Action Failed",
        title: deleteError?.message,
        type: "error",
      });
    },
  });
  console.log(error, data, isLoading, isError);
  const columns = useMemo(
    () => [
      {
        accessorKey: "year", //access nested data with dot notation
        header: "#Year",
        enableGlobalFilter: false,
        Cell: ({ renderedCellValue, row }) => {
          return new Date(row.original.year).getFullYear();
        },
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
  const handleDelete = () => {
    mutate(docID);
  };

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ my: 5, fontWeight: "bold" }}>
          Budget
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
          pos
          renderTopToolbarCustomActions={() => (
            <Button color="secondary" onClick={() => setAddDialog(true)} variant="contained">
              Add Budget
            </Button>
          )}
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
                <IconButton
                  color="error"
                  onClick={(e) => {
                    setConfirmDialog(true);
                    setDocID(row?.original?._id);
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
        <ConfirmDialog
          isOpen={() => setConfirmDialog(false)}
          loading={deleteLoading}
          onConfirm={handleDelete}
          open={confirmDialog}
          subTitle={"This action can't be undone"}
          title={"Delete"}
        />
        <CustomSnackBar notify={notify} setNotify={setNotify} />
        <CustomeDialog open={addDialog} setOpen={() => setAddDialog(false)} title={"Add Budget"}>
          <BudgetForm />
        </CustomeDialog>
      </Container>
    </>
  );
}
