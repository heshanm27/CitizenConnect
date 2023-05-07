import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DocumentRequestCard from "../../Components/Common/CustomCard/DocumentRequestCard";
export default function Documents() {
  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h3" sx={{ my: 5 }}>
          Avaliable Documents
        </Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item sm={12} md={4} key={item}>
              <DocumentRequestCard />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ my: 5 }}>
          <Typography variant="h4">Frequently asked question</Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>How to get the Passport?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography>How to get the Driving License?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
