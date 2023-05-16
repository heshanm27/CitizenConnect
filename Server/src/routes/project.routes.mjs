import express from "express";
import { deleteProject, getProject, getProjects, updateProject, createProject } from "../controller/project.controller.mjs";
const Router = express.Router();

//default routes
Router.route("/").get(getProjects).post(createProject);
//paramterized routes
Router.route("/:id").get(getProject).patch(updateProject).delete(deleteProject);

export default Router;
