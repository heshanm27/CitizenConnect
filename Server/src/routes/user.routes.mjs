import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controller/user.controller.mjs";

const Router = express.Router();

//default routes
Router.route("/").get(getUsers).post(createUser);
//paramterized routes
Router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default Router;
