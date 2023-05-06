import { Avatar, Box, Card, CardActionArea, CardContent, Icon, Stack, Typography } from "@mui/material";
import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export default function BudgetDateCard() {
  return (
    <Card sx={{ borderRadius: "20px", my: 5, mx: 1 }}>
      <CardActionArea sx={{ p: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <Avatar sx={{ width: 56, height: 56, color: "white" }}>
              {" "}
              <CalendarMonthIcon />
            </Avatar>

            <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
              2021
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
