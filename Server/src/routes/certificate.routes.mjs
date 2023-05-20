import express from "express";
import { addCertificate, deleteCertificate, getCertificate, getCertificates, updateCertificate,completeOrder } from "../controller/certificate.controller.mjs";


const Router = express.Router();

//default routes
Router.route("/").get(getCertificates).post(addCertificate);
//paramterized routes
Router.route("/:id").get(getCertificate).patch(updateCertificate).delete(deleteCertificate);
Router.route("/complete/:id").post(completeOrder);

export default Router;
