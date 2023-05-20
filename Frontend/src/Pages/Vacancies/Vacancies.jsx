import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import { List, ListItemButton, ListItemText, ListSubheader, Pagination } from "@mui/material";
import { useState } from "react";
import { VacanciesCategory } from "../../Components/Form/VacanciesForm";
import VacanciesCard from "../../Components/Common/CustomCard/VacanciesCard";
import { pascalCase } from "change-case";
import { useQuery } from "@tanstack/react-query";
import { getVacancies } from "../../Api/vacancies.api";
import { useTheme } from "@emotion/react";
import Lottie from "lottie-react";
import NotDataFound from "../../Assets/lottie/97179-no-data-found.json";
export default function Vacancies() {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const [selectedCat, setSelectedCat] = useState("");
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
    queryKey: ["user-vacancies", filter],
    queryFn: () => getVacancies(filter),
    onError: () => {
      setNotify({
        isOpen: true,
        message: "Error occured when data loading",
        title: "Error",
        type: "error",
      });
    },
  });

  const handleClick = () => {
    setOpen(!open);
  };
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  console.log(data);
  return (
    <>
      <Navbar />
      <main>
        {/* Hero unit */}

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

        <Container maxWidth="lg" sx={{ mt: 5, minHeight: "80vh" }}>
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
                {VacanciesCategory.map((item) => (
                  <ListItemButton
                    sx={{ bgcolor: selectedCat === item ? theme.palette.action.selected : "" }}
                    key={item}
                    onClick={() => handleCategoryChange(item)}
                  >
                    <ListItemText primary={pascalCase(item)} />
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
              {data?.vacancies.length === 0 ? <NoVacancies /> : null}
                {data?.vacancies?.map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <VacanciesCard data={card} />
                  </Grid>
                ))}
                <Stack direction={"row"} justifyContent={"center"} sx={{ mt: 5, width: "100%" }}>
                  <Pagination color="primary" page={page} count={data?.total} variant="outlined" shape="rounded" onChange={handlePageChange} />
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
function NoVacancies() {
  return (
    <Stack sx={{ width: "100%", height: "40vh", my: 5 }} justifyContent={"center"} alignItems={"center"}>
      <Lottie style={{ width: "50%" }} animationData={NotDataFound} loop={true} />
      <Typography variant="h4" align="center">
        No Vacancies to Show
      </Typography>
    </Stack>
  );
}