import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function DocumentRequestCard({
  imgUrl,
    title,
    discription,
    link

}) {
  const navigate = useNavigate()
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={()=>navigate(link)}>
        <CardMedia component="img" height="140" image={imgUrl} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <div
                dangerouslySetInnerHTML={{
                  __html:{discription},
                }}
              ></div>
          
          </Typography>
          <Button sx={{ mt: 3 }} variant="outlined" fullWidth>
            Request Now
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
