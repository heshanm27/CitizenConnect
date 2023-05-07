import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import BudgetDateCard from "../../Components/Common/CustomCard/BudgetDateCard";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Pagination, Stack } from "@mui/material";

const cards = [1, 2, 3, 4, 5, 7, 8, 9];

export default function Budgets() {
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(1);
  const handleClick = () => {
    setOpen(!open);
  };
  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  return (
    <>
      <Navbar />
      <main>
        <Container maxWidth="lg">
          <Typography component="h1" variant="h4" align="left" color="text.primary" sx={{ my: 5 }} gutterBottom>
            Budgets
          </Typography>

          <Slider {...settings}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <BudgetDateCard key={item} />
            ))}
          </Slider>
        </Container>

        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Typography variant="h4" align="left" color="text.primary" gutterBottom>
            2021 Budget Allocation
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography>Budgets $200 milion</Typography>
            <Typography>Allocated $100 milion</Typography>
          </Stack>

          <Box sx={{ mt: 5 }}>
            <Typography variant="h4" align="left" color="text.primary" sx={{ my: 5 }}>
              Our Projects In 2021
            </Typography>
            <Grid container spacing={4}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((card) => (
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
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}
