import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function VacanciesCard({ data }) {
  const navigate = useNavigate();
  console.log("data", data);
  return (
    <Card sx={{ height: "480px", display: "flex", flexDirection: "column" }} elevation={2}>
      <CardActionArea onClick={() => navigate(`/vacancies/${data?._id}`)}>
        <CardMedia component="img" loading="lazy" style={{ height: "200px" }} image={data?.thumbnail || "https://source.unsplash.com/random"} alt="random" />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {data?.title}
          </Typography>
          <Typography style={{ maxHeight: "100px", overflow: "hidden", textOverflow: "ellipsis" }}>{data?.short_description}</Typography>
          {/* <Typography variant="body2" color="text.secondary">
            <div
              dangerouslySetInnerHTML={{
                __html: "<p>This is a media card. You can use this section to describe the content</p>",
              }}
            ></div>
          </Typography> */}
        </CardContent>
        <CardActions>
          <Button size="small">Apply</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
