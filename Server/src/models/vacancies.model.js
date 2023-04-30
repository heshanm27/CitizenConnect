import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { UnAuthorized, BadRequestError } from "../errors";

const JobVacanciesSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    avatar: { type: String },
    role: { type: String, enum: ROLES, default: ROLES.USER },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vacancies", JobVacanciesSchema);
