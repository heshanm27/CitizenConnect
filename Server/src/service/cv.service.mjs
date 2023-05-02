export const getBudgets = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1" }) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json({
      budgets,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
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
