import { ListItemButton, ListItemText, Tooltip, Typography, ListItem, ListItemIcon, useTheme, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../Redux/auth.slice";

export default function CustomLink({ drawerStatus, label, icon, path, activeIcon }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isActive = location.pathname === path;

  const handleClick = () => {
    if (path === "/logout") {
      console.log("logout path active link");
      dispatch(logOut("logged out"));
      navigate("/admin/login", { replace: true });
      return;
    }
    navigate(path, { replace: true });
  };
  return (
    <Tooltip title={label} placement="right" arrow>
      <ListItem
        sx={{
          p: 0,
          m: 1,
          mt: 2,
          mb: 2,
          width: "calc(100% - 16px)",
        }}
      >
        <ListItemButton
          sx={{
            backgroundColor: isActive ? theme.palette.action.selected : "",
            borderRadius: theme.spacing(1),
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={() => handleClick()}
        >
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={4}>
            <ListItemIcon
              sx={{
                color: isActive ? theme.palette.action.activatedOpacity : "#878787",
                minWidth: "auto",
              }}
            >
              {isActive ? activeIcon : icon}
            </ListItemIcon>
            {drawerStatus ? (
              <ListItemText>
                <Typography
                  sx={{
                    color: isActive ? theme.palette.action.activatedOpacity : "#878787",
                  }}
                >
                  {label}
                </Typography>
              </ListItemText>
            ) : null}
          </Stack>
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}
