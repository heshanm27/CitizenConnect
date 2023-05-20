import { CustomError, BadRequestError } from "../error/index.mjs";
import CVModel from "../models/cv.model.mjs";

export const getCVS = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1",id }) => {
  try {
    return await CVModel.find({
      vacancie: id,
    })
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const getCV = async (id) => {
  try {
    const cv = await CVModel.findById(id);
    if (!cv) {
      throw new BadRequestError("Budget not found");
    }
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const createCV = async (CV) => {
  try {
    return await CVModel.create(CV);
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const deleteCV = async (id) => {
  try {
    await CVModel.findByIdAndDelete(id);
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const updateCV = async (id, CV) => {
  try {
    return await CVModel.findByIdAndUpdate(id, CV, { new: true });
  } catch (error) {
    throw new CustomError(error.message);
  }
};
