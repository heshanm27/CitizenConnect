import mongoose, { Schema } from "mongoose";

const BudgetSchema = new Schema(
  {
    year: { type: Date, required: true },
    allocated_budget: { type: Number, required: true },
    spended_budget: { type: Number, required: true },
    unit: { type: String, required: true },
    description: { type: String, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Budget", BudgetSchema);
