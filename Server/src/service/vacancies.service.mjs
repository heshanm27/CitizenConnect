import vacanciesModel from "../models/vacancies.model.mjs";
import { CustomError, BadRequestError } from "../error/index.mjs";
export const getVacancies = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "500", page = "1" ,cat=""}) => {
  try {
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (cat) {
      query["category"] =cat;
    }
    const vacancies =  await vacanciesModel
      .find(query)
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
      const totalDocCount = await vacanciesModel.countDocuments(query)
      .sort({
        [sortBy]: order,
      })
      .count();

    const total = Math.ceil(totalDocCount / limit);

    return { vacancies, total: total };
  } catch (error) {
    throw new CustomError(error.message);
  }
};

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

export const createVacancy = async (vacancy) => {
  const newVacancy = new vacanciesModel(vacancy);
  try {
    return await newVacancy.save();
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const deleteVacancy = async (id) => {
  try {
    return await vacanciesModel.findByIdAndDelete(id);
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const updateVacancy = async (id, vacancy) => {
  try {
    return await vacanciesModel.findByIdAndUpdate(id, vacancy);
  } catch (error) {
    throw new CustomError(error.message);
  }
};
