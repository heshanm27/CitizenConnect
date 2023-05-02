import CVService from "../services/cv.service.js";

export const getCVs = async (req, res) => {
  try {
    const cvs = await CVService.findAll();
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCV = async (req, res) => {
  try {
    const cv = await CVService.findById(req.params.id);
    res.status(200).json(cv);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addCV = async (req, res) => {};

export const deleteCV = async (req, res) => {};

export const updateCV = async (req, res) => {};
