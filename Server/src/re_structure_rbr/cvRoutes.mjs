import express from "express";
import { addCV, deleteCV, getCV, getCVs, updateCV } from "../controller/cv.controller.mjs";

const Router = express.Router();

//default routes
Router.route("/").get(getCVs).post(addCV);
//paramterized routes
Router.route("/:id").get(getCV).patch(updateCV).delete(deleteCV);

export default Router;
