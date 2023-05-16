import * as CVService from "../service/cv.service.mjs";

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

export const addCV = async (req, res) => {
  try {
    const cv = await CVService.create(req.body);
    res.status(201).json(cv);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteCV = async (req, res) => {
  try {
    await CVService.delete(req.params.id);
    res.status(200).json({ message: "CV deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCV = async (req, res) => {
  try {
    const cv = await CVService.update(req.params.id, req.body);
    res.status(200).json(cv);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
