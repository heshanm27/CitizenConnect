import express from "express";
import { createVacancy, deleteVacancy, getVacancies, getVacancy, updateVacancy } from "../controller/vacancies.controller.mjs";

const Router = express.Router();

//default routes
Router.route("/").get(getVacancies).post(createVacancy);
//paramterized routes
Router.route("/:id").get(getVacancy).patch(updateVacancy).delete(deleteVacancy);

export default Router;
