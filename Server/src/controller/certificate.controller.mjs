import CertificateModel from "../models/certificate.model.js";

export const getCertificates = async (req, res) => {
  try {
    const certificates = await CertificateModel.find();
    res.status(200).json(certificates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCertificate = async (req, res) => {
  try {
    const certificate = await CertificateModel.findById(req.params.id);
    res.status(200).json(certificate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addCertificate = async (req, res) => {
  const certificate = req.body;
  const newCertificate = new CertificateModel(certificate);
  try {
    await newCertificate.save();
    res.status(201).json(newCertificate);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    await CertificateModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCertificate = async (req, res) => {};
