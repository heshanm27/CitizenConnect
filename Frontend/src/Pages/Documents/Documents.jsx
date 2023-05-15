import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DocumentRequestCard from "../../Components/Common/CustomCard/DocumentRequestCard";

const AvaliableDocument = [
  {
    imgUrl: "https://www.journo.lk/wp-content/uploads/2021/11/11-edited-scaled-1-620x1024.jpg",
    title: "Birth Ceritificate",
    discription: " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    link: "/documents/birth",
  },
  {
    imgUrl: "https://www.journo.lk/wp-content/uploads/2021/11/11-edited-scaled-1-620x1024.jpg",
    title: "Death Ceritificate",
    discription: " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    link: "/documents/death",
  },
  {
    imgUrl: "https://www.journo.lk/wp-content/uploads/2021/11/11-edited-scaled-1-620x1024.jpg",
    title: "Marriage  Ceritificate",
    discription: " Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    link: "/documents/marriage",
  },
];

export default function Documents() {
  return (
    <>
      <Navbar />
      <Container sx={{ height: "80vh" }}>
        <Typography variant="h3" sx={{ my: 5 }}>
          Avaliable Documents
        </Typography>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {AvaliableDocument.map((item) => (
            <Grid item sm={12} md={4} key={item}>
              <DocumentRequestCard discription={item.discription} imgUrl={item.imgUrl} link={item.link} title={item.title} />
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
