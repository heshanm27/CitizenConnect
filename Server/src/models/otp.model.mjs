

import mongoose, { Schema } from "mongoose";

const OtpSchema = new Schema(
  {
    email: { type: String, required: true },
        otp: { type: Number, required: true },
        createAt: { type: Date, default: Date.now },
        expireAt: { type: Date, default: Date.now, expires: 600 },
  },
);

OtpSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.otp = await bcrypt.hash(this.otp, salt);
    next();
  });
  
OtpSchema.methods.validateOTP = async function (otp) {
    const IsPasswordMatched = await bcrypt.compare(otp, this.otp);
    console.log(IsPasswordMatched);
    if (IsPasswordMatched) {
        return true;
    }
    return false;
 }


export default mongoose.model("otp", OtpSchema);
