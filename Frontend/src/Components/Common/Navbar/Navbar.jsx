import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import AvatarBtn from "../AvatarBtn/AvatarBtn";
import { Container, useTheme } from "@mui/material";
import { Typography, Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.authSlice);

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "News", link: "/news" },
    { label: "Vacancies", link: "/vacancies" },
    { label: "Budget Allocation", link: "/contact" },
    { label: "Request Documents", link: "/documents" },
  ];

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
              <Stack direction={"row"} justifyContent={"end"}>
                {menuItems.map((item) => (
                  <Box key={item.label}>
                    <CustomLink label={item.label} url={item.link} />
                  </Box>
                ))}
              </Stack>
              <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                {isLoggedIn && <AvatarBtn />}
              </Stack>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Box sx={{ ...theme.mixins.toolbar, mb: 5 }}></Box>
      <Box sx={{ ...theme.mixins.toolbar }}></Box>
    </>
  );
}

function CustomLink({ label, url }) {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    if (pathname === url) {
      setIsActive(true);
    }
  }, [pathname]);

  return (
    <Link
      sx={{ ml: 4, mr: 4, fontSize: "16px", fontWeight: "bold" }}
      href={url}
      underline="hover"
      color={isActive ? theme.palette.primary.main : theme.palette.grey[400]}
    >
      {label}
    </Link>
  );
}
