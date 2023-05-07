import { CustomError, BadRequestError } from "../error/index.mjs";
import Certificate from "../models/certificate.model.mjs";

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
  const newCertificate = new Certificate(certificate);
  try {
    return await newCertificate.save();
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const deleteCertificate = async (req, res) => {
  const { id } = req.params;
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
