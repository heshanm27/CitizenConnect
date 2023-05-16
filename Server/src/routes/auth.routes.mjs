import express from "express";
import { SignIn, SignUp } from "../controller/auth.controller.mjs";

const Router = express.Router();

//default routes
Router.route("/signin").post(SignIn);
Router.route("/signup").get(SignUp);

export default Router;
