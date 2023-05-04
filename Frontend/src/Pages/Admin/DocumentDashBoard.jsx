import React from "react";

export default function DocumentDashBoard() {
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["admin-live-orders"], queryFn: () => fetch("/api/orders").then((res) => res.json()) });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [docId, setDocId] = useState("");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setDocId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate(`/admin/orders/${docId}`);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "orderId", //access nested data with dot notation
        header: "#ID",
        enableGlobalFilter: false,
      },
      {
        accessorFn: (row) => row.user.firstName + " " + row.user.lastName, //access nested data with dot notation
        header: "Customer Name",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "createdAt", //normal accessorKey
        header: "Date",
        Cell: ({ renderedCellValue, row }) => {
          return new Date(row.original.createdAt).toLocaleDateString();
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ renderedCellValue, row }) => {
          switch (row.original.status) {
            case "new":
              return <Chip label="New" color="error" />;
            case "approved":
              return <Chip label="Approved" color="success" />;
            case "rejected":
              return <Chip label="Rejected" color="error" />;
            case "delivered":
              return <Chip label="Delivered" color="success" />;
            default:
              return <Chip label="Pending" color="warning" />;
          }
        },
      },
      {
        accessorKey: "totalPrice",
        header: "Total Amount",
        Cell: ({ renderedCellValue, row }) => {
          return row.original.totalPrice?.toLocaleString?.("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
        },
      },
      {
        accessorKey: "isPaid",
        header: "Payment",
        Cell: ({ renderedCellValue, row }) => {
          return row.original.isPaid ? <Chip label="Paid" color="success" /> : <Chip label="UnPaid" color="default" />;
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
          rowCount={data?.orders.length ?? 0}
          columns={columns}
          data={data?.orders ?? []}
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
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      </Container>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Edit /> Action
        </MenuItem>
      </Menu>
    </>
  );
}
