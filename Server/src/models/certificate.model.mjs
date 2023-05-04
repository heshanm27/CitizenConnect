import mongoose, { Schema } from "mongoose";

const CertificateSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    project_owner: { type: String, required: true, unique: true },
    DOB: { type: Date, required: true },
    description: { type: Boolean, default: false },
    reason_for_request: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    place_of_birth: { type: String },
    number_of_copy: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Certificate", CertificateSchema);
