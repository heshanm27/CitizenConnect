import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    allocated_budget: { type: Number, required: true },
    project_owner: { type: String, required: true, unique: true },
    year_of_allocation: { type: Date, required: true },
    description: { type: Boolean, default: false },
    thumbnail: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Projects", ProjectSchema);
