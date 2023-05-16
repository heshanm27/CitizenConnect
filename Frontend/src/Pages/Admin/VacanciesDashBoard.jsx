import { Box, Button, Chip, Container, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import { deleteBudget, getBudgets } from "../../Api/budget.api";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArticleIcon from "@mui/icons-material/Article";
import ConfirmDialog from "../../Components/Common/ConfirmDialog/ConfirmDialog";
import CustomSnackBar from "../../Components/Common/SnackBar/SnackBar";
import CustomeDialog from "../../Components/Common/CustomDialog/CustomDialog";
import VacanciesForm from "../../Components/Form/VacanciesForm";
import { getVacancies } from "../../Api/vacancies.api";
export default function VacanciesDashBoard() {
  const theme = useTheme();
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

  const {
    isLoading: deleteLoading,
    error: deleteError,
    mutate,
  } = useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-vacancies"]);
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
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["admin-vacancies"], queryFn: getVacancies });

  const handleDelete = () => {
    mutate(docID);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "title", //normal accessorKey
        header: "Vacancie Title",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "closing_date", //access nested data with dot notation
        header: "Vacancie Closing Date ",
        enableGlobalFilter: false,
        Cell: ({ renderedCellValue, row }) => {
          return new Date(row.original.closing_date).toLocaleDateString();
        },
      },

      {
        accessorKey: "createdAt", //normal accessorKey
        header: "Published Date",
        Cell: ({ renderedCellValue, row }) => {
          return new Date(row.original.createdAt).toLocaleDateString();
        },
      },
      {
        accessorKey: "responses", //normal accessorKey
        header: "Vacancie Responses Count",
        enableGlobalFilter: false,
      },
    ],
    []
  );
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ my: 5, fontWeight: "bold" }}>
          Vacancies
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
          renderTopToolbarCustomActions={() => (
            <Button color="secondary" onClick={() => setAddDialog(true)} variant="contained">
              Add Vacancies
            </Button>
          )}
          rowCount={data?.vacancies?.length ?? 0}
          columns={columns}
          data={data?.vacancies ?? []}
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
              <Tooltip arrow placement="left" title="View CV">
                <IconButton color="success" onClick={(e) => handleClick(e, row?.original?._id)}>
                  <ArticleIcon />
                </IconButton>
              </Tooltip>
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
        <CustomeDialog open={addDialog} setOpen={() => setAddDialog(false)} title={"Add Vacancies"}>
          <VacanciesForm setDialogOff={() => setAddDialog(false)} setNotify={setNotify} />
        </CustomeDialog>
      </Container>
    </>
  );
}
