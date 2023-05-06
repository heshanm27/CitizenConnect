import mongoose, { Schema } from "mongoose";

const CertificateSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    DOB: { type: Date, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    place_of_birth: { type: String },
    number_of_copy: { type: Number, default: 1 },
    certificate_type: { type: String, required: true },
    certificate_language: { type: String, required: true },
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
