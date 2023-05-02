export const getCertificates = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1" }) => {
  try {
    const certificates = await Certificate.find();
    res.status(200).json({
      certificates,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getCertificate = async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createCertificate = async (req, res) => {
  const certificate = req.body;
  const newCertificate = new Certificate(certificate);
  try {
    await newCertificate.save();
    res.status(201).json({
      newCertificate,
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deleteCertificate = async (req, res) => {
  const { id } = req.params;
  try {
    await Certificate.findByIdAndDelete(id);
    res.status(200).json({
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updateCertificate = async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
