import { Avatar, Box, Card, CardActionArea, CardContent, Icon, Stack, Typography } from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
export default function BudgetDateCard() {
  return (
    <Card sx={{ borderRadius: "20px", my: 5, mx: 1 }}>
      <CardActionArea sx={{ p: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Avatar sx={{ width: 56, height: 56 }}>
              {" "}
              <AccessTimeIcon />
            </Avatar>

            <Typography variant="h4" component="div">
              2021
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
