import * as OtpService from "../service/otp.service.mjs";



export const sendOtp = async (req, res) => { 
    try {
        const { email } = req.body;
        const otps= await OtpService.sendOTP(email);
        res.status(200).json({
            message: "OTP sent please check your email",
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
}

export const verifyOtp = async (req, res) => {
    try {
        const { otp,email } = req.body;
        const otps = await OtpService.verifyOTP(otp,email);
        res.status(200).json({
            message: "OTP verified successfully",
        });
      } catch (error) {
        res.status(404).json({ message: error.message });
      }
 }