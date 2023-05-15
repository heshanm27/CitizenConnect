import otpModel from "../models/otp.model.mjs";
import NodeMailer from "nodemailer";
import { CustomError } from "../error/index.mjs";
import bcrypt from "bcrypt";

export const Transpoter = NodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "natureayure@gmail.com",
    pass: "jtkgrcvpkpsjvuho",
  },
});
export const sendOTP = async (email) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`.toString();

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP for email verification",
      html: `<p>Your OTP for email verification is <b>${otp}</b>,Please enter this otp to verify your email in the application.</p>`,
    };
    await otpModel.create({ email, otp });
    const result = await Transpoter.sendMail(mailOptions);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    throw new CustomError("Error while sending otp");
  }
};
export const verifyOTP = async (revcivedotp, email) => {
  try {
    const otps = await otpModel.find({ email });
    if (!otps) {
      throw new CustomError("Invalid OTP");
    }
    console.log("revcivedotp", revcivedotp);
    for (const otpDoc of otps) {
      const matched = await otpDoc.validateOTP(revcivedotp);
      console.log("matched", matched, otpDoc.otp);
      if (matched) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new CustomError("Error while verifying otp");
  }
};
