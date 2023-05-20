import React, { useEffect } from "react";
import { Box, Typography, Button, Paper, CircularProgress, useTheme } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../../Redux/payment.slice";
import { invalidateOtp } from "../../../Redux/otp.slice";
const PaymentSuccess = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      navigate("/documents", { replace: true });
      dispatch(deleteOrder());
      dispatch(invalidateOtp());
    }, 10000);

    return () => clearTimeout(redirectTimeout);
  }, []);
  return (
    <Paper>
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <CheckCircleOutline sx={{ fontSize: "4rem", color: "#4caf50" }} />
        <Typography variant="body2" color={theme.palette.text.secondary} sx={{ fontSize: "40px" }}>
          Payment Completed Successful!
        </Typography>
        <Typography variant="body2" color={theme.palette.text.secondary} sx={{ fontSize: "20px" }}>
          Thank you for your purchase!
        </Typography>
        <Button sx={{ my: 2 }} variant="contained" color="primary" href="/">
          Back to Home
        </Button>
        <p>You will be redirected with in 10 seconds.</p>
      </Box>
      </Box>
      </Paper>
  );
};

export default PaymentSuccess;
