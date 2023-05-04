import { BadRequestError, CustomError } from "../error/index.mjs";
import Budget from "../models/budget.model.mjs";

export const getBudgets = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1" }) => {
  try {
    return await Budget.find({
      title: { $regex: search, $options: "i" },
    })
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
  } catch (error) {
    throw BadRequestError(error.message);
  }
};

export const getBudget = async (id) => {
  const { id } = req.params;
  try {
    const budget = await Budget.findById(id);
    if (!budget) {
      throw new BadRequestError("Budget not found");
    }
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
  const { id } = req.params;
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
