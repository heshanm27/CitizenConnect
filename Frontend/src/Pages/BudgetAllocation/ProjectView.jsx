import { Button, Container, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar/Navbar";
import Footer from "../../Components/Common/Footer/Footer";
import EmailIcon from "@mui/icons-material/Email";
export default function ProjectView() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <>
      <Navbar />
      <Container sx={{ height: "80vh" }}>
        <Divider textAlign="left">
          <Typography variant="h3" sx={{ my: 5 }}>
            Jib title
          </Typography>
        </Divider>

        <img
          style={{ height: "300px", width: "100%", objectFit: "cover" }}
          src="https://images.unsplash.com/photo-1682686581484-a220483e6291?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        />
        <Stack spacing={2} sx={{ my: 5 }}>
          <Grid container justifyContent={"end"} alignItems="center" spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
                the 1500s, when an unknown printer took a galley
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} container justifyContent="center" alignItems={"baseline"} sx={{ bgcolor: theme.palette.action.selected, p: 2 }}>
              <Typography color="orange" display="inline" alignSelf="flex-end">
                Closing Date
              </Typography>
              <Typography color="white" display="inline" alignSelf="flex-end" marginLeft={1}>
                2023/02/2
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ p: 3 }}>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    "<h2> </p><p>Paragraph 4 </p><p>Paragraph 5 </p>'] 'My Doc 1' '<h2>MyTitleMyTitleMyTitleMyTitleMyTitleMyTitleMyTitle</h2><p>Paragraph 1 </p><p>Paragraph 2 </p><p>Paragraph 3 </p><p>Paragraph 4 </p><p>Paragraph 5 </p>",
                }}
              ></div>
            </Grid>
            {/* <Grid item xs={2} justifyContent={"end"} alignItems={"end"}>
              <Button endIcon={<EmailIcon />} variant="contained" fullWidth onClick={() => navigate("/vacancies/:id/apply")}>
                Apply
              </Button>
            </Grid> */}
          </Grid>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}
