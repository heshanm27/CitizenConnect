import vacanciesModel from "../models/vacancies.model.mjs";
import { CustomError, BadRequestError } from "../error/index.mjs";
export const getVacancies = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1" }) => {
  try {
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    const vacancies =  await vacanciesModel
      .find(query)
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    return { vacancies, total: vacancies.length };
  } catch (error) {
    throw new CustomError(error.message);
  }
};

//getting vacancy details


export const getVacancy = async (id) => {
  try {
    const vacancy = await vacanciesModel.findById(id);
    if (!vacancy) {
      throw new BadRequestError("Vacancy not found");
    }
    return vacancy;
  } catch (error) {
    throw new CustomError(error.message);
  }
};

//creating vacancy

export const createVacancy = async (vacancy) => {
  const newVacancy = new vacanciesModel(vacancy);
  try {
    return await newVacancy.save();
  } catch (error) {
    throw new CustomError(error.message);
  }
};

//deleting vacancy

export const deleteVacancy = async (id) => {
  try {
    return await vacanciesModel.findByIdAndDelete(id);
  } catch (error) {
    throw new CustomError(error.message);
  }
};

//updating vacancy

export const updateVacancy = async (id, vacancy) => {
  try {
    return await vacanciesModel.findByIdAndUpdate(id, vacancy, { new: true });
  } catch (error) {
    throw new CustomError(error.message);
  }
};
