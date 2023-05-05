import { Container, Grid, Box, Typography, Paper } from "@mui/material";
import React from "react";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import PORTFOLIOSVG from "../../Assets/undraw_portfolio_update_re_jqnp.svg";
export default function Home() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
          <Grid item sm={12} md={6}>
            <Paper>
              <Box sx={{ p: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: "bold", mb: 5, display: "inline" }}>
                  Welcome!
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 }}>
                    to the official government services portal!
                  </Typography>
                </Typography>
                <Typography variant="body1" color={"gray"}>
                  <b>W</b>e are glad to have you here. This portal is designed to provide you with easy access to all the government services and benefits you
                  need. Whether you're looking for information on taxes, healthcare, education, or anything else, we've got you covered. Our goal is to make
                  your experience as smooth and hassle-free as possible, so please don't hesitate to reach out if you need any assistance. Thank you for
                  visiting and we hope you find what you're looking for!
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <img src={PORTFOLIOSVG} alt="portfolio" />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
