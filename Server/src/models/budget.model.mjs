import mongoose, { Schema } from "mongoose";

const BudgetSchema = new Schema(
  {
    Year: { type: String, required: true },
    allocated_budget: { type: Number, required: true },
    description: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Budget", BudgetSchema);
