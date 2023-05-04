import vacanciesModel from "../models/vacancies.model";
import { CustomError, BadRequestError } from "../error/index.mjs";
export const getVacancies = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1" }) => {
  try {
    return await vacanciesModel
      .find({})
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
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
