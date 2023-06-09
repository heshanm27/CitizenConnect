import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import AvatarBtn from "../AvatarBtn/AvatarBtn";
import { Container, IconButton, useTheme } from "@mui/material";
import { Typography, Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NightlightIcon from "@mui/icons-material/Nightlight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { changeMode } from "../../../Redux/darkMode.slice";
import {

  pascalCase,

} from "change-case";
export default function Navbar() {
  const theme = useTheme();
  const { mode } = useSelector((state) => state.modeSlice);
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const menuItems = [
    { label: "Home", link: "/" },
    { label: "News", link: "/news" },
    { label: "Vacancies", link: "/vacancies" },
    { label: "Budget Allocation", link: "/budget" },
    { label: "Request Documents", link: "/documents" },
  ];
  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    let curruntmode = mode === "light" ? "dark" : "light";
    dispatch(changeMode(curruntmode));
  };
  return (
    <>
      <AppBar color="inherit" position="fixed" variant="outlined">
        <Toolbar>
          <Container maxWidth="xl" sx={{ height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link sx={{ textDecoration: "none" }} href="/">
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
                variant="h5"
              >
                CitizenConnect
              </Typography>
            </Link>

            <Box>
              <Stack direction={"row"} justifyContent={"end"} alignItems={"center"}>
                {menuItems.map((item) => (
                  <Box key={item.label}>
                    <CustomLink label={item.label} url={item.link} />
                  </Box>
                ))}
                <IconButton aria-label="delete" onClick={handleClick}>
                  {mode === "light" ? <NightlightIcon /> : <WbSunnyIcon />}
                  {/* <KeyboardArrowDownIcon /> */}
                </IconButton>
                {isLoggedIn && <AvatarBtn />}
              </Stack>
              {/* <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                {isLoggedIn && <AvatarBtn />}
              </Stack> */}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Box sx={{ ...theme.mixins.toolbar, mb: 5 }}></Box>
    </>
  );
}

function CustomLink({ label, url }) {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    const firstPathnameSegment = pathname.split("/")[1];
    const firstUrlSegment = url.split("/")[1];

    if (firstPathnameSegment === firstUrlSegment) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [pathname, url]);
  return (
    <Link
      sx={{ ml: 4, mr: 4, fontSize: "16px", fontWeight: "bold" }}
      href={url}
      underline="hover"
      color={isActive ? theme.palette.primary.main : theme.palette.grey[400]}
    >
      {pascalCase(label)}
    </Link>
  );
}
