import { CustomError, BadRequestError } from "../error/index.mjs";
import News from "../models/news.model.mjs";

export const getManyNews = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1" }) => {
  try {
    return await News.find()
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const getOneNews = async (id) => {
  try {
    const news = await News.findById(id);
    if (!news) {
      throw new BadRequestError("News not found");
    }
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const createNews = async (news) => {
  const newNews = new News(news);
  try {
    return await newNews.save();
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const updateNews = async (id, news) => {
  try {
    return await News.findByIdAndUpdate(id, news, { new: true });
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const deleteNews = async (id) => {
  try {
    return await News.findByIdAndDelete(id);
  } catch (error) {
    throw new CustomError(error.message);
  }
};
