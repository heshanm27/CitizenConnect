import React, { useEffect } from "react";
import { Box, Typography, Button, Paper, useTheme } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteCertificate } from "../../../Api/certificate.api";
import { useDispatch, useSelector } from "react-redux";
import { invalidateOtp } from "../../../Redux/otp.slice";

const PaymentCancel = () => {
  const theme = useTheme();
  const CertificateOrderID = useSelector((state) => state.paymentSlice.CertificateOrderID);
  console.log("CertificateOrderID", CertificateOrderID);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      dispatch(deleteOrder());
      dispatch(invalidateOtp());
    },
  });

  useEffect(() => {
    mutate(CertificateOrderID);
    const redirectTimeout = setTimeout(() => {
      navigate("/documents", { replace: true });
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
          <BlockIcon sx={{ fontSize: "4rem", color: "red" }} />
          <Typography variant="body2" color={theme.palette.error.main} sx={{ fontSize: "40px" }}>
            Payment Faild
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary} sx={{ fontSize: "16px" }}>
            Unfortunately, your payment was not successful. Please try again.
          </Typography>
          <Button sx={{ my: 2 }} variant="contained" color="error" href="/">
            Back to Home
          </Button>
          <p>You will be automatically redirected with in 10 seconds.</p>
        </Box>
      </Box>
    </Paper>
  );
};

export default PaymentCancel;
