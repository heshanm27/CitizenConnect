import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import { List, ListItemButton, ListItemText, ListSubheader, Pagination, useTheme } from "@mui/material";
import { useState } from "react";
import { NEWSCategoryTypes } from "../../Components/Form/NewsForm";
import { useQuery } from "@tanstack/react-query";
import CustomSnackBar from "../../Components/Common/SnackBar/SnackBar";
import { getNews } from "../../Api/news.api";
import ProjectCard from "../../Components/Common/CustomCard/ProjectCard";

const cards = [1, 2, 3, 4, 5, 7, 8, 9];

export default function News() {
  const theme = useTheme();
  const [selectedCat, setSelectedCat] = useState("");
  const [page, setPage] = useState(1);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "error",
    title: "",
  });

  const handlePageChange = (event, page) => {
    setPage(page);
    setFilter((prev) => ({
      ...prev,
      page,
    }));
  };

  const [filter, setFilter] = useState({
    limit: 12,
    order: -1,
    page: 1,
    search: "",
    sortBy: "createdAt",
    cat: "",
  });
  const handleCategoryChange = (cat) => {
    setSelectedCat(cat);
    setFilter((prev) => ({
      ...prev,
      cat,
    }));
  };

  const handleClearCategory = () => {
    setSelectedCat("");
    setFilter((prev) => ({
      ...prev,
      cat: "",
    }));
  };
  const { data, isLoading } = useQuery({
    queryKey: ["user-news", filter],
    queryFn: () => getNews(filter),
    onError: () => {
      setNotify({
        isOpen: true,
        message: "Error occured when data loading",
        title: "Error",
        type: "error",
      });
    },
  });
  console.log(data);
  return (
    <>
      <Navbar />
      <main>
        {/* Hero unit */}

        <Container maxWidth="xl">
          <Typography component="h1" sx={{ my: 5,fontWeight:700 }} variant="h2" align="center" color="text.primary" gutterBottom>
            NEWS
          </Typography>
        </Container>

        <Container maxWidth="xl">
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
                {NEWSCategoryTypes.map((item) => (
                  <ListItemButton
                    sx={{ bgcolor: selectedCat === item ? theme.palette.action.selected : "" }}
                    key={item}
                    onClick={() => handleCategoryChange(item)}
                  >
                    <ListItemText primary={item} />
                  </ListItemButton>
                ))}
                {selectedCat ? (
                  <ListItemButton sx={{ bgcolor: theme.palette.error.main }} onClick={handleClearCategory}>
                    <ListItemText color="red" primary={"Clear Filters"} />
                  </ListItemButton>
                ) : null}
              </List>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={4}>
                {cards.map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <ProjectCard img={"https://source.unsplash.com/random"} subDiscription={"text news"} title={"test news"} onClick={()=>{}} />
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
      <CustomSnackBar notify={notify} setNotify={setNotify} />
      <Footer />
    </>
  );
}

function NoNews() {
  return (
    <Stack sx={{ width: "100%", height: "40vh", my: 5 }}>
      <Typography variant="h4" align="center">
        No News to Show
      </Typography>
    </Stack>
  );
}
