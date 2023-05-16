import * as NewsService from "../service/news.service.mjs";
import uploadFile from "../util/fileUploader.mjs";

export const getManyNews = async (req, res) => {
  try {
    const news = await NewsService.getManyNews({
      limit: req.query.limit,
      skip: req.query.skip,
      page: req.query.page,
      search: req.query.search,
      order: req.query.order,
      sortBy: req.query.sortBy,
      cat: req.query.cat,
    });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNews = async (req, res) => {
  try {
    const news = await NewsService.getOneNews(req.params.id);
    res.status(200).json(news);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNews = async (req, res) => {
  try {

    const { title, short_description, description, 'news_category[]': news_category } = req.body;
    const categories = Array.isArray(news_category) ? news_category : [news_category];
    const data = {
      title,
      short_description,
      description,
      news_category: categories
    };

    let revievedNews =  data;
        if (req.files) {
          const uploadedResponse = await uploadFile(req.files.thumbnail.tempFilePath, req.files.thumbnail.name, "news");
          revievedNews = { ...data, thumbnail: uploadedResponse };
        }

        const news = await NewsService.createNews(revievedNews);
        res.status(201).json(news);

  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateNew = async (req, res) => {
  try {
    const uploadedResponse = await uploadFile(req.files.thumbnail.tempFilePath, req.files.thumbnail.name, "vacancy");
    const revievedNews = { ...req.body, thumbnail: uploadedResponse };
    const news = await NewsService.updateNews(req.params.id, revievedNews);
    res.status(200).json(news);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteNew = async (req, res) => {
  try {
    await NewsService.deleteNews(req.params.id);
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
