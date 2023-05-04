import * as NewsService from "../service/news.service.mjs";

export const getManyNews = async (req, res) => {
  try {
    const news = await NewsService.findAll();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNews = async (req, res) => {
  try {
    const news = await NewsService.findById(req.params.id);
    res.status(200).json(news);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNews = async (req, res) => {
  try {
    const news = await NewsService.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateNew = async (req, res) => {
  try {
    const news = await NewsService.update(req.params.id, req.body);
    res.status(200).json(news);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteNew = async (req, res) => {
  try {
    await NewsService.delete(req.params.id);
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
