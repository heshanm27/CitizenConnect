import { Button, Container, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import EmailIcon from "@mui/icons-material/Email";
import { getOneNews } from "../../Api/news.api";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
export default function NewsViews() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery({ queryKey: ["news"], queryFn: () => getOneNews(id) });
  const postedDay = dayjs(data?.createdAt).fromNow();
  console.log(data);
  return (
    <>
      <Navbar />
      <Container sx={{ height: "80vh" }}>
        <Divider textAlign="left">
          <Typography variant="h6" sx={{ my: 5 }}>
            {data?.title}
          </Typography>
        </Divider>

        <img
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
          src={data?.thumbnail}
        />
        <Typography>Posted {postedDay }</Typography>
        <Stack spacing={2} sx={{ my: 5 }}>
          <Grid container justifyContent={"end"} alignItems="start" spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography>
                {data?.short_description}
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
