import BudgetModel from "../models/budget.model";

export const getBudgets = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1" }) => {
  try {
    return await BudgetModel.find()
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
  } catch (error) {
    throw BadRequestError(error.message);
  }
};

export const getBudget = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await Budget.findById(id);
    res.status(200).json({
      budget,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createBudget = async (req, res) => {
  const budget = req.body;
  const newBudget = new Budget(budget);
  try {
    await newBudget.save();
    res.status(201).json({
      newBudget,
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    await Budget.findByIdAndDelete(id);
    res.status(200).json({
      message: "Budget deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updateBudget = async (req, res) => {
  const { id } = req.params;
  const { title, description, amount, date } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No budget with id: ${id}`);
  const updatedBudget = { title, description, amount, date, _id: id };
  await Budget.findByIdAndUpdate(id, updatedBudget, { new: true });
  res.json(updatedBudget);
};
