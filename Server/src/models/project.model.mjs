import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    allocated_budget: { type: Number, required: true },
    spended_budget: { type: Number, required: true },
    unit: { type: String, required: true },
    project_owner: { type: String, required: true },
    year_of_allocation: { type: Date, required: true },
    description: { type: String, default: false },
    thumbnail: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Projects", ProjectSchema);
