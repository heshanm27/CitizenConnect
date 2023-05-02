export const getManyNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json({
      news,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getOneNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    res.status(200).json({
      news,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createNews = async (req, res) => {
  const news = req.body;
  const newNews = new News(news);
  try {
    await newNews.save();
    res.status(201).json({
      newNews,
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, description, content, author, image } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No news with id: ${id}`);
  const updatedNews = { title, description, content, author, image, _id: id };
};

export const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    await News.findByIdAndDelete(id);
    res.status(200).json({
      message: "News deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
