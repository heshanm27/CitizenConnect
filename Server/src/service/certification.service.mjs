import { CustomError, BadRequestError } from "../error/index.mjs";
import Certificate from "../models/certificate.model.mjs";
import NodeMailer from "nodemailer";

export const Transpoter = NodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "natureayure@gmail.com",
    pass: "jtkgrcvpkpsjvuho",
  },
});

export const getCertificates = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "500", page = "1" }) => {
  try {
    return await Certificate.find()
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const getCertificate = async (id) => {
  try {
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      throw new BadRequestError("Certificate not found");
    }

    return certificate;
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const createCertificate = async (certificate) => {
  console.log("new certificate", certificate);
  try {
    return await Certificate.create(certificate);
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const deleteCertificate = async (id) => {
  try {
    return await Certificate.findByIdAndDelete(id);
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const updateCertificate = async (id, data) => {
  try {
    return await Certificate.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export async function completeCertificateOrder(id,input) {
  try {
    const foundOrder = await Certificate.findOne({
      _id: id,
    }).exec();
    if (!foundOrder) throw new BadRequestError("Order Not Found");
    foundOrder.orderStatus = "Completed";
    await foundOrder.save();
     const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your Requetsed Certificate is Ready",
      html: `<p>Your  Can Download from herer <a href=${input.file}><button>Download</button></a></p>`,
    };

    const result = await Transpoter.sendMail(mailOptions);
  } catch (e) {
    throw new Error(e.message);
  }
 }
export async function sendOrderRecipet(username, email,  recieptUrl) {
  try {

    // const mailOptions = {
    //   from: process.env.EMAIL,
    //   to: email,
    //   subject: "Order Recipet",
    //   html: `<p>Your  Digital Recipt for Order <a href=${recieptUrl}><button>${otp}</button></a></p>`,
    // };

    // const result = await Transpoter.sendMail(mailOptions);


    // const foundOrder = await Order.findOne({
    //   _id: input.orderId,
    // }).exec();
    // if (!foundOrder) throw new BadRequestError("Order Not Found");
    // foundOrder.status = "Sent";
    // foundOrder.sentAt = new Date();
    // await foundOrder.save();
  } catch (e) {
    throw new Error(e.message);
  }
}