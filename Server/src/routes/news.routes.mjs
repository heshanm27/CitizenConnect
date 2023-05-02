import express from "express";
import { createNew, deleteNew, getManyNews, getNews, updateNew } from "../controller/news.controller.mjs";

const Router = express.Router();

//default routes
Router.route("/").get(getManyNews).post(createNew);
//paramterized routes
Router.route("/:id").get(getNews).patch(updateNew).delete(deleteNew);

export default Router;
