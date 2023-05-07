import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

export default function DocumentRequestCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image="/static/images/cards/contemplative-reptile.jpg" alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Birth Certificate
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
          </Typography>
          <Button sx={{ mt: 3 }} variant="outlined" fullWidth>
            Request Now
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
