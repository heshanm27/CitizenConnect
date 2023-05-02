import mongoose, { Schema } from "mongoose";

const JobCvSchema = new Schema(
  {
    applicant_first_name: { type: String, required: true },
    applicant_last_name: { type: Number, required: true },
    nic: { type: String },
    email: { type: String, required: true },
    passport: { type: String },
    additional_info: { type: String },
    cv: { type: String },
    phone: { type: String },
    dob: { type: Date, required: true },
    description: { type: Boolean, default: false },
    addresss: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Projects", JobCvSchema);
