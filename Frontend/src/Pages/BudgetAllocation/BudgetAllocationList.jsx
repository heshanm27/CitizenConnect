import Button from "@mui/material/Button";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Pagination } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useState } from "react";

const cards = [1, 2, 3, 4, 5, 7, 8, 9];

export default function Vacancies() {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(1);
  const handleClick = () => {
    setOpen(!open);
  };
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  return (
    <>
      <Navbar />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <Container maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
              Avaliable Vacancies
            </Typography>
            <Typography variant="body" align="center" color="text.secondary" paragraph>
              The Vacancies process typically begins with identifying the need for a new position and creating a job description outlining the required
              qualifications and experience. This job description is then advertised on the government information site and other relevant job boards to attract
              suitable candidates. Once the application deadline has passed, the applications are screened by a team to ensure they meet the required
              qualifications and experience. Shortlisted candidates are then invited for an interview or other selection procedures such as written tests, group
              discussions or presentations.
            </Typography>
          </Container>
        </Box>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <List
                sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Filter by Category
                  </ListSubheader>
                }
              >
                <ListItemButton>
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sent mail" />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItemButton>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Starred" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={4}>
                {cards.map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                      <CardMedia component="img" image="https://source.unsplash.com/random" alt="random" />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Heading
                        </Typography>
                        <Typography>This is a media card. You can use this section to describe the content.</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
                <Stack direction={"row"} justifyContent={"center"} sx={{ mt: 5, width: "100%" }}>
                  <Pagination color="primary" page={page} count={10} variant="outlined" shape="rounded" onChange={handlePageChange} />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
      <Footer />
    </>
  );
}
