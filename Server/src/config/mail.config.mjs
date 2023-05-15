import NodeMailer from "nodemailer";

export default NodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_MAIL,
    pass: process.env.ADMIN_MAILAPP_PASSWORD,
  },
});