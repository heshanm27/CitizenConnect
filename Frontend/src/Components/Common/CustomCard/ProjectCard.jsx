import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

export default function ProjectCard({ title, subDiscription, img, onClick }) {
  return (
    <Card elevation={3} sx={{ height: "500px", display: "flex", flexDirection: "column" }}>
      <CardActionArea onClick={onClick}>
        <CardMedia sx={{ height: "220px" }} component="img" loading="lazy" image={img} alt="random" />
        <CardContent sx={{ height: "200px", overflow: "hidden", my: 1, p: 2 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography textOverflow={"ellipsis"} sx={{ overflow: "hidden" }}>
            <div
              dangerouslySetInnerHTML={{
                __html:  subDiscription ,
              }}
            ></div>
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" fullWidth size="small">
            View
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
