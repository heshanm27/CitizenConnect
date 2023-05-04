import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import SegmentIcon from "@mui/icons-material/Segment";
import { Avatar, Container, IconButton, ListItemIcon, Menu, MenuItem, Stack, useTheme } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import CustomLink from "./CustomLinks/CustomLinks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { green } from "@mui/material/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ADMIN_ROUTES } from "./DrawerRoutes/DrawerRoutes.js";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Logout } from "@mui/icons-material";

import HomeIcon from "@mui/icons-material/Home";
import { useDispatch } from "react-redux";
const drawerWidth = 240;
const drawerWidthClose = 60;

export default function CustomDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  // const { role, avatar, firstName } = useAppSelector((state) => state.authSlice);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleDrawerClose = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (state) => {
    switch (state) {
      case "Logout":
        // dispatch(logOut("logout"));
        navigate("/signin", { replace: true });
        setAnchorEl(null);
        return;
      case "home":
        navigate("/", { replace: true });
        setAnchorEl(null);
        return;
        break;
      default:
        setAnchorEl(null);
        return;
    }
  };
  return (
    <>
      <IconButton>
        <PhotoCamera />
      </IconButton>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            width: `calc(100% - ${open ? drawerWidth : drawerWidthClose}px)`,
            borderBottom: 1,
            borderColor: "#eeeeee",
            overflowX: "hidden",
            ml: `${drawerWidth}px`,
            mb: theme.mixins.toolbar,
            transition: theme.transitions.create("width", {
              easing: open ? theme.transitions.easing.sharp : theme.transitions.easing.sharp,
              duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ p: 1 }}>
            {!open ? (
              <Typography variant="h6" noWrap component="div">
                Citizen Connect
              </Typography>
            ) : (
              <div></div>
            )}
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Avatar alt="Remy Sharp" />
              {/* <Typography>{firstName}</Typography> */}
              <IconButton aria-label="delete" onClick={handleClick}>
                <KeyboardArrowDownIcon />
              </IconButton>
            </Stack>
          </Stack>
        </AppBar>
        <Drawer
          sx={{
            width: open ? drawerWidth : drawerWidthClose,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : drawerWidthClose,
              border: 1,
              borderColor: "#eeeeee",
              boxSizing: "border-box",
              transition: theme.transitions.create("width", {
                easing: open ? theme.transitions.easing.sharp : theme.transitions.easing.sharp,
                duration: open ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen,
              }),
            },
          }}
          open={open}
          variant="permanent"
          anchor="left"
          elevation={0}
          hideBackdrop
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: theme.spacing(0, 1),
              ...theme.mixins.toolbar,
            }}
          >
            {open ? (
              <Typography align="left" variant="h6" noWrap component="div">
                Nature Ayur
              </Typography>
            ) : null}
            <IconButton onClick={handleDrawerClose}>
              <SegmentIcon />
            </IconButton>
          </Box>
          <Box sx={{ mt: 5 }}>
            <List sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
              {ADMIN_ROUTES.map((item, index) => (
                <CustomLink drawerStatus={open} label={item.name} path={item.path} activeIcon={item.activeIcon} key={item.path} icon={item.icon} />
              ))}

              <Box sx={{ flexGrow: 1 }}></Box>
              <CustomLink drawerStatus={open} label={"Logout"} path={"/logout"} activeIcon={<LogoutIcon />} key={"logout"} icon={<LogoutOutlinedIcon />} />
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            width: `calc(100% - ${open ? drawerWidth : drawerWidthClose}px)`,
            mt: "60px",
            minHeight: "calc(100vh - 60px)",
            backgroundColor: green["50"],
            overflowY: "hidden",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 0,
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={menuOpen}
        onClose={() => handleClose("")}
        onClick={() => handleClose("")}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleClose("home")}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          Home
        </MenuItem>
        <MenuItem onClick={() => handleClose("logout")}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
