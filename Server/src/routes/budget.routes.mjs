import express from "express";
import { createBudget, deleteBudget, getBudget, getBudgets, updateBudget } from "../controller/budget.controller.mjs";

const Router = express.Router();

//default routes
Router.route("/").get(getBudgets).post(createBudget);
//paramterized routes
Router.route("/:id").get(getBudget).patch(updateBudget).delete(deleteBudget);

export default Router;
