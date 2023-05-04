import express from "express";
import { createNews, deleteNew, getManyNews, getNews, updateNew } from "../controller/news.controller.mjs";

const Router = express.Router();

//default routes
Router.route("/").get(getManyNews).post(createNews);
//paramterized routes
Router.route("/:id").get(getNews).patch(updateNew).delete(deleteNew);

export default Router;
