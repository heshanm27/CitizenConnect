import express from "express";
import {sendOtp,verifyOtp} from "../controller/otp.controller.mjs"

const Router = express.Router();

//default routes
Router.route("/request").post(sendOtp)
Router.route("/verify").post(verifyOtp)


export default Router;
