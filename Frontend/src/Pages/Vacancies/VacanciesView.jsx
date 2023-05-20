import { Button, Container, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import EmailIcon from "@mui/icons-material/Email";
import { useQuery } from "@tanstack/react-query";
import { getVacancy } from "../../Api/vacancies.api";
export default function VacanciesView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const { data, error, isLoading, isError } = useQuery({ queryKey: ["vacancie"], queryFn: () => getVacancy(id) });
  console.log(data);
  return (
    <>
      <Navbar />
      <Container sx={{ height: "80vh" }}>
        <Divider textAlign="left">
          <Typography variant="h3" sx={{ my: 5 }}>
            {data?.title}
          </Typography>
        </Divider>

        <img style={{ height: "400px", width: "100%", objectFit: "cover" }} src={data?.thumbnail} />
        <Stack spacing={2} sx={{ my: 5 }}>
          <Grid container justifyContent={"end"} alignItems="center" spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography>{data?.short_description}</Typography>
            </Grid>
            <Grid item xs={12} sm={4} container justifyContent="center" alignItems={"baseline"} sx={{ bgcolor: theme.palette.action.selected, p: 2 }}>
              <Typography color="orange" display="inline" alignSelf="flex-end">
                Closing Date
              </Typography>
              <Typography color="white" display="inline" alignSelf="flex-end" marginLeft={1}>
                {new Date(data?.closing_date).toLocaleDateString()}
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ p: 3 }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.description,
                }}
              ></div>
            </Grid>
            <Grid item xs={2} justifyContent={"end"} alignItems={"end"}>
              <Button endIcon={<EmailIcon />} variant="contained" fullWidth onClick={() => navigate("/vacancies/:id/apply")}>
                Apply
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
