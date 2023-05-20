import mongoose, { Schema } from "mongoose";

const CertificateSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    certificate_type: { type: String, required: true },
    certificate_language: { type: [String], required: true },
    payment: {
      ispaid: { type: Boolean, default: false },
      payment_method: { type: String },
      payment_date: { type: Date },
      payment_amount: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Certificate", CertificateSchema);
