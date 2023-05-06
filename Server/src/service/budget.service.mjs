import { BadRequestError, CustomError } from "../error/index.mjs";
import Budget from "../models/budget.model.mjs";

export const getBudgets = async ({ search = "", sortBy = "year", order = "-1", limit = "2", page = "1" }) => {
  try {
    return await Budget.find({
      // year: { $regex: search, $options: "i" },
    })
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

export const getBudget = async (id) => {
  try {
    const budget = await Budget.findById(id);
    if (!budget) {
      throw new BadRequestError("Budget not found");
    }
    return budget;
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const createBudget = async (budget) => {
  const newBudget = new Budget(budget);
  try {
    return await newBudget.save();
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const deleteBudget = async (id) => {
  try {
    return await Budget.findByIdAndDelete(id);
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const updateBudget = async (id, budget) => {
  try {
    return await Budget.findByIdAndUpdate(id, budget, { new: true });
  } catch (error) {
    throw new CustomError(error.message);
  }
};
