import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import BudgetDateCard from "../../Components/Common/CustomCard/BudgetDateCard";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Pagination, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "../../Api/budget.api";
import { getProjects } from "../../Api/project.api";
import SkeltonCard from "../../Components/Common/CustomCard/SkeltonCard";
import ProjectCard from "../../Components/Common/CustomCard/ProjectCard";

export default function Budgets() {
  const [open, setOpen] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    limit: 12,
    order: -1,
    page: 1,
    search: "",
    sortBy: "createdAt",
    year: "",
  });
  const handleClick = () => {
    setOpen(!open);
  };
  const handlePageChange = (event, page) => {
    setPage(page);
    setFilter((prev) => ({
      ...prev,
      page,
    }));
  };
  const handleSeletedYear = (data) => {
    setSelectedData(data);
    setFilter((prev) => ({
      ...prev,
      year: data.year,
    }));
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-budget"],
    queryFn: getBudgets,
  });
  const {
    data: projectData,
    isLoading: isprojectsLoad,
    isError: isProjectError,
  } = useQuery({
    queryKey: ["user-budget-project", filter],
    queryFn: () => getProjects(filter),
  });

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedData(data[0]);
      setFilter({
        year: data[0]?.year,
      });
    }
  }, [data]);

  console.log(projectData);
  return (
    <>
      <Navbar />
      <main>
        <Container maxWidth="lg">
          <Typography component="h1" variant="h4" align="left" color="text.primary" sx={{ my: 5 }} gutterBottom>
            Budget
          </Typography>

          <Slider {...settings}>
            {data?.map((item) => (
              <BudgetDateCard key={item} data={item} selectedYear={selectedData} handleSeletedYear={handleSeletedYear} />
            ))}
          </Slider>
        </Container>

        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Typography variant="h4" align="left" color="text.primary" gutterBottom>
            {selectedData?.year} Budget Allocation
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography>Allocated Budget {selectedData?.allocated_budget + " " + selectedData?.unit}</Typography>
            <Typography>Spended Budget{selectedData?.spended_budget + " " + selectedData?.unit}</Typography>
          </Stack>

          <Box sx={{ mt: 5 }}>
            <Typography variant="h4" align="left" color="text.primary" sx={{ my: 5 }}>
              {projectData?.projetData.length == 0 ? null : `Our Projects In ${selectedData?.year}`}
            </Typography>
            <Grid container spacing={4}>
              {isLoading ||
                (isprojectsLoad &&
                  [1, 2, 3, 4, 5, 6].map((item) => (
                    <Grid item key={item} xs={12} sm={6} md={4}>
                      <SkeltonCard />
                    </Grid>
                  )))}
              {projectData?.projetData.length == 0 ? <NoProject /> : null}
              {projectData?.projetData.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <ProjectCard />
                </Grid>
              ))}
              <Stack direction={"row"} justifyContent={"center"} sx={{ mt: 5, width: "100%" }}>
                <Pagination
                  color="primary"
                  page={page}
                  count={projectData ? projectData?.total : 0}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                />
              </Stack>
            </Grid>
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}

function NoProject() {
  return (
    <Stack sx={{ width: "100%", height: "40vh", my: 5 }}>
      <Typography variant="h4" align="center">
        No Project to Show
      </Typography>
    </Stack>
  );
}
