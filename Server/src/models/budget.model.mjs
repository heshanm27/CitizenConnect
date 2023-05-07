import mongoose, { Schema } from "mongoose";

const BudgetSchema = new Schema(
  {
    year: { type: String, required: true, unique: true },
    allocated_budget: { type: Number, required: true },
    spended_budget: { type: Number, default: 0 },
    unit: { type: String, required: true },
    description: { type: String, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Budget", BudgetSchema);
