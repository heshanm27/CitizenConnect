import mongoose, { Schema } from "mongoose";

const JobCvSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    nic_passport: { type: String },
    email: { type: String, required: true },
    cv: { type: String, required: true },
    phone: { type: String },
    dob: { type: Date, required: true },
    coverletter: { type: String },
    addresss: { type: String },
    vacancie: { type: Schema.Types.ObjectId, ref: "Vacancies" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("CV", JobCvSchema);
