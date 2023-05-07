import { CustomError } from "../error/index.mjs";
import * as OtpService from "../service/otp.service.mjs";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new CustomError("Email is required");
    const otps = await OtpService.sendOTP(email);
    res.status(200).json({
      message: "OTP sent please check your email",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;
    if (!otp) throw new CustomError("OTP is required");
    if (!email) throw new CustomError("Email is required");

    const IsvalidateOtp = await OtpService.verifyOTP(otp, email);
    console.log("isinvalid",IsvalidateOtp);
    if (IsvalidateOtp) {
      res.status(200).json({
        message: "OTP verified successfully",
      });
    } else {
      throw new CustomError("Invalid OTP");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
