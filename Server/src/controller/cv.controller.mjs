import * as CVService from "../service/cv.service.mjs";
import uploadFile from "../util/fileUploader.mjs";

export const getCVs = async (req, res) => {

  console.log("get all called")
  try {
    const cvs = await CVService.getCVS({
      search: req.query.search,
      sortBy: req.query.sortBy,
      order: req.query.order,
      limit: req.query.limit,
      page: req.query.page,
      id: req.query.id,
    });
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCV = async (req, res) => {
  console.log("get one called",req.query.id)
  try {
    const cv = await CVService.getCV(req.params.id);
    res.status(200).json(cv);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addCV = async (req, res) => {
  try {
    let recievedcv = req.body;
    if (req?.files?.cv?.tempFilePath) {
      const uploadedResponse = await uploadFile(req?.files?.cv.tempFilePath, req?.files?.cv?.name, "cv");
      recievedcv = { ...req.body, cv: uploadedResponse };
    }
    console.log("recievedcv", recievedcv);
    const cv = await CVService.createCV(recievedcv);
    res.status(201).json(cv);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteCV = async (req, res) => {
  try {
    await CVService.deleteCV(req.params.id);
    res.status(200).json({ message: "CV deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateCV = async (req, res) => {
  try {
    const cv = await CVService.updateCV(req.params.id, req.body);
    res.status(200).json(cv);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
