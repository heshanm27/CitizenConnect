import mongoose, { Schema } from "mongoose";

const JobVacanciesSchema = new Schema(
  {
    tittle: { type: String, required: true },
    short_description: { type: String, required: true },
    closing_date: { type: Date, required: true, unique: true },
    description: { type: String, required: true },
    qualifications: { type: [String], required: true },
    salary: { type: Number, default: 0 },
    thumbnail: { type: String, default: "https://source.unsplash.com/random" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Vacancies", JobVacanciesSchema);
