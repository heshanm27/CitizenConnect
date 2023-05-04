import React from "react";
import { Container, Box, Typography, Link, List, ListItem, Stack, ListItemIcon, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import { v4 as uuidv4 } from "uuid";

export default function Footer() {
  const footerData = [
    {
      title: "Navigate",
      links: [
        {
          name: "Home",
          url: "/",
        },
        {
          name: "News",
          url: "/news",
        },
        {
          name: "Vacancies",
          url: "/vacancies",
        },
        {
          name: "Budget Allocation",
          url: "/contact",
        },
        {
          name: "Request Documents",
          url: "/documents",
        },
      ],
    },
    {
      title: "Stay connected",
      links: [
        {
          name: "Nature Ayur",
          icon: <FacebookIcon />,
          url: "https://www.facebook.com/hashan.madaranga.7/",
        },
      ],
    },
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Stack sx={{ p: 2 }} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid container spacing={2}>
            {footerData.map((item) => (
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box key={uuidv4()} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                  <Typography align="start">{item.title}</Typography>
                  <Divider />
                  <List>
                    {item.links.map((link, i) => (
                      <ListItem disablePadding sx={{ pt: 1, pb: 1, pr: 0, pl: 0, justifyContent: "center", alignItems: "center" }} key={uuidv4()}>
                        {link?.icon && <ListItemIcon sx={{ minWidth: "0px", pr: 1 }}>{link?.icon}</ListItemIcon>}
                        <FooterLink name={link.name} url={link.url} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Box>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

function FooterLink(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link color="inherit" underline="hover" href={props.url}>
        {props.name}
      </Link>
    </Typography>
  );
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.facebook.com/hashan.madaranga.7/">
        Nature Ayur
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
