import { Box, Button, Chip, Container, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getProjects } from "../../Api/project.api";
import ConfirmDialog from "../../Components/Common/ConfirmDialog/ConfirmDialog";
import CustomSnackBar from "../../Components/Common/SnackBar/SnackBar";
import CustomeDialog from "../../Components/Common/CustomDialog/CustomDialog";
import { deleteBudget } from "../../Api/budget.api";
import ProjectForm from "../../Components/Form/ProjectForm";
export default function ProjectDashBoard() {
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
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["admin-project"], queryFn: getProjects });
  console.log(error, data, isLoading, isError);

  const {
    isLoading: deleteLoading,
    error: deleteError,
    mutate,
  } = useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-project"]);
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
  const handleDelete = () => {
    mutate(docID);
  };
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
          rowCount={data?.projetData.length ?? 0}
          columns={columns}
          data={data?.projetData ?? []}
          renderTopToolbarCustomActions={() => (
            <Button color="secondary" onClick={() => setAddDialog(true)} variant="contained">
              Add Project
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
        <CustomeDialog open={addDialog} setOpen={() => setAddDialog(false)} title={"Add Project"}>
          <ProjectForm setDialogOff={() => setAddDialog(false)} setNotify={setNotify} />
        </CustomeDialog>
      </Container>
    </>
  );
}
