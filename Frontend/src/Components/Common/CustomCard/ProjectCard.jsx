import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ title, subDiscription, img, onClick,url }) {
  const navigate = useNavigate();
  return (
    <Card elevation={3} sx={{ height: "500px", display: "flex", flexDirection: "column" }}>
      <CardActionArea onClick={onClick}>
        <CardMedia sx={{ height: "220px" }} component="img" loading="lazy" image={img} alt="random" />
        <CardContent sx={{ height: "200px", overflow: "hidden", my: 1, p: 2 }}>
          <Typography gutterBottom variant="body1" textOverflow={"ellipsis"} component="h2" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="body1" textOverflow={"ellipsis"} sx={{ lineClamp: 1,overflow:"hidden",display:"-webkit-box",boxOrient:'vertical' }}>
            {subDiscription} 
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" fullWidth size="small" onClick={() => navigate(url)}>
            View
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
