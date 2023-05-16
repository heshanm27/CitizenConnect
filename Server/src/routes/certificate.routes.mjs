import express from "express";
import { addCertificate, deleteCertificate, getCertificate, getCertificates, updateCertificate } from "../controller/certificate.controller.mjs";

const Router = express.Router();

//default routes
Router.route("/").get(getCertificates).post(addCertificate);
//paramterized routes
Router.route("/:id").get(getCertificate).patch(updateCertificate).delete(deleteCertificate);

export default Router;
