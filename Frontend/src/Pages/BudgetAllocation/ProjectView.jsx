import {  Box, Container, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import { getProject } from "../../Api/project.api";
import { useQuery } from "@tanstack/react-query";
import { Doughnut } from "react-chartjs-2";
export default function ProjectView() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["project"], queryFn: () => getProject(id)});
  console.log(data)

  const Piedata = {
    labels: [`Spent Budget(${data?.unit})`, `Remaining Budget(${data?.unit})`],
    datasets: [
      {
        data: [data?.spended_budget, data?.allocated_budget-data?.spended_budget],
        backgroundColor: ['#FF6384', '#36A2EB'],
        borderWidth: 1,

      },
    ],
  };
  return (
    <>
      <Navbar />
      <Container sx={{ minHeight: "80vh" }}>
        <Divider textAlign="left">
          <Typography variant="h6" sx={{ my: 5 }}>
            {data?.title}
          </Typography>
        </Divider>

        <img
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
          src={data?.thumbnail}
        />
        <Stack sx={{width:"100%"}}  direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={2}>
          <Box  sx={{width:"800px",height:"400px",display:"flex",justifyContent:"center",alignContent:"center"}}>
              <Doughnut data={Piedata} />
          </Box>
          </Stack>
        <Stack spacing={2} sx={{ my: 5 }}>
          <Grid container justifyContent={"end"} alignItems="center" spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography>
               Project Owner : {data?.project_owner}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} container justifyContent="center" alignItems={"baseline"} sx={{ bgcolor: theme.palette.action.selected, p: 2 }}>
              <Typography color="orange" display="inline" alignSelf="flex-end">
                Year
              </Typography>
              <Typography color="white" display="inline" alignSelf="flex-end" marginLeft={1}>
               {data?.year_of_allocation?.year}
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ p: 3 }}>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                   data?.description
                }}
              ></div>
            </Grid>
          </Grid>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
