import express from "express";
import { addCV, deleteCV, getCV, getCVs, updateCV } from "../controller/cv.controller.mjs";

const Router = express.Router();

//default routes
Router.route("/").post(addCV);
Router.route("/vacancy/:id").get(getCVs);
//paramterized routes
Router.route("/:id").get(getCV).patch(updateCV).delete(deleteCV);

export default Router;
