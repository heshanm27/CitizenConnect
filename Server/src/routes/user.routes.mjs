import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controller/user.controller.mjs";

const Router = express.Router();

//default routes
Router.route("/").get(getUsers);
//paramterized routes
Router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default Router;
