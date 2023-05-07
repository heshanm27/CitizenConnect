import * as CertificateService from "../service/certification.service.mjs";

export const getCertificates = async (req, res) => {
  try {
    const certificates = await CertificateService.getCertificates();
    res.status(200).json(certificates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCertificate = async (req, res) => {
  try {
    const certificate = await CertificateService.getCertificate(req.params.id);
    res.status(200).json(certificate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addCertificate = async (req, res) => {
  const certificate = req.body;

  try {
    const newCertificate = await CertificateService.addCertificate(certificate);
    res.status(201).json(newCertificate);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const deleted = await CertificateService.deleteCertificate(req.params.id);
    res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const updatedCertificate = await CertificateService.updateCertificate(req.params.id, req.body);
    res.status(200).json(updatedCertificate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
