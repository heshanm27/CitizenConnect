import * as BudgetService from "../service/budget.service.mjs";

const getBudget = async (req, res) => {
  try {
    const budget = await BudgetService.getBudget(req.params.id);
    res.status(200).json(budget);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getBudgets = async (req, res) => {
  try {
    const budgets = await BudgetService.getBudgets({
      limit: req.query.limit,
      skip: req.query.skip,
      page: req.query.page,
      search: req.query.search,
      order: req.query.order,
      sortBy: req.query.sortBy,
    });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const createBudget = async (req, res) => {
  const budget = req.body;
  try {
    const newBudget = await BudgetService.createBudget(budget);
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const updateBudget = async (req, res) => {
  const { id } = req.params;
  const budget = req.body;
  try {
    const updatedBudget = await BudgetService.updateBudget(id, budget);
    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
const deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    await BudgetService.deleteBudget(id);
    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getBudget, getBudgets, createBudget, updateBudget, deleteBudget };
