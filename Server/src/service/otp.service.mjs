import otpModel from "../models/otp.model.mjs";
import Transpoter from "../config/mail.config.mjs";



export const sendOTP = async (email) => { 
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "OTP for email verification",
        text: `<p>Your OTP for email verification is <b>${otp}</b>,Please enter this otp to verify your email in the application.</p>`,
        }
        await otpModel.create({ email, otp });
        await Transpoter.sendMail(mailOptions);       
    } catch (error) {
        throw new CustomError("Error while sending otp");
     }


};
export const verifyOTP = async (otp, email) => { };