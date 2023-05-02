export const getVacancies = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1" }) => {
  try {
    const vacancies = await Vacancy.find();
    res.status(200).json({
      vacancies,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getVacancy = async (req, res) => {
  const { id } = req.params;
  try {
    const vacancy = await Vacancy.findById(id);
    res.status(200).json({
      vacancy,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createVacancy = async (req, res) => {
  const vacancy = req.body;
  const newVacancy = new Vacancy(vacancy);
  try {
    await newVacancy.save();
    res.status(201).json({
      newVacancy,
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deleteVacancy = async (req, res) => {
  const { id } = req.params;
  try {
    await Vacancy.findByIdAndDelete(id);
    res.status(200).json({
      message: "Vacancy deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updateVacancy = async (req, res) => {
  const { id } = req.params;
  const { title, description, salary, location, contract, company, tags, image } = req.body;
  try {
  } catch (error) {}
};
