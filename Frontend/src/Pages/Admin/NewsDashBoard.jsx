import { Box, Button, Chip, Container, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import { deleteBudget, getBudgets } from "../../Api/budget.api";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import NewsForm from "../../Components/Form/NewsForm";
import ConfirmDialog from "../../Components/Common/ConfirmDialog/ConfirmDialog";
import CustomSnackBar from "../../Components/Common/SnackBar/SnackBar";
import CustomeDialog from "../../Components/Common/CustomDialog/CustomDialog";
import { deleteNews, getNews } from "../../Api/news.api";

export default function NewsDashBoard() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [addDialog, setAddDialog] = useState(false);
  const [docID, setDocID] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["admin-news"], queryFn: getNews });
  const {
    isLoading: deleteLoading,
    error: deleteError,
    mutate,
  } = useMutation({
    mutationFn: deleteNews,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-news"]);
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
        accessorKey: "title", //normal accessorKey
        header: "News title",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "short_description", //normal accessorKey
        header: "News Short Description",
        enableGlobalFilter: false,
      },
      {
        accessorKey: "createdAt", //normal accessorKey
        header: "News published date",
        enableGlobalFilter: false,
        Cell: ({ renderedCellValue, row }) => {
          return new Date(row.original.createdAt).toLocaleDateString();
        },
      },
      {
        accessorKey: "news_category", //normal accessorKey
        header: "News categories",
        enableGlobalFilter: false,
        Cell: ({ renderedCellValue, row }) => row.original.news_category.map((item) => <Chip label={item}/>
          )
          // console.log("news types",news_category);
       
      
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
          News
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
          rowCount={data?.news?.length ?? 0}
          columns={columns}
          data={data?.news ?? []}
          renderTopToolbarCustomActions={() => (
            <Button color="secondary" onClick={() => setAddDialog(true)} variant="contained">
              Add News
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
                <IconButton
                  onClick={(e) => {
                    setUpdateData(row.original);
                    setUpdateDialog(true);
                  }}
                >
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
        <CustomeDialog open={addDialog} setOpen={() => setAddDialog(false)} title={"Add News"}>
          <NewsForm setDialogOff={() => setAddDialog(false)} setNotify={setNotify} />
        </CustomeDialog>
        <CustomeDialog open={updateDialog} setOpen={() => setUpdateDialog(false)} title={"Update Add News"}>
          <NewsForm setDialogOff={() => setUpdateDialog(false)} setNotify={setNotify} updatData={updateData} />
        </CustomeDialog>
      </Container>
    </>
  );
}
