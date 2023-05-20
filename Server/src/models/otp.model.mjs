import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
const OtpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  expireAt: { type: Date, default: Date.now, expires: 120 },
});

OtpSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    this.otp = await bcrypt.hash(String(this.otp), salt);
    next();
  } catch (error) {
    next(error);
  }
});

OtpSchema.methods.validateOTP = async function (otp) {
  const IsPasswordMatched = await bcrypt.compare(otp.toString(), this.otp.toString());
  console.log(IsPasswordMatched);
  if (IsPasswordMatched) {
    return true;
  }
  return false;
};

export default mongoose.model("otp", OtpSchema);
