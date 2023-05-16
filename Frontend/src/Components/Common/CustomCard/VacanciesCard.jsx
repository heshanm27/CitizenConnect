import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function VacanciesCard({ data }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea onClick={() => navigate(`/vacancies/${data.id}`)}>
        <CardMedia component="img" loading="lazy" image="https://source.unsplash.com/random" alt="random" />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            Heading
          </Typography>
          <Typography>This is a media card. You can use this section to describe the content.</Typography>
          <Typography variant="body2" color="text.secondary">
          <div
                dangerouslySetInnerHTML={{
                  __html:"<p>This is a media card. You can use this section to describe the content</p>",
                }}
              ></div>
          
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Apply</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
