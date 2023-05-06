import mongoose, { Schema } from "mongoose";

const JobCvSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: Number, required: true },
    nic: { type: String },
    email: { type: String, required: true },
    passport: { type: String },
    cv: { type: String, required: true },
    phone: { type: String },
    dob: { type: Date, required: true },
    coverletter: { type: String },
    addresss: { type: String },
    vacancies: { type: Schema.Types.ObjectId, ref: "Vacancies" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CV", JobCvSchema);
