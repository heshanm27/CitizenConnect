import * as VacanciesService from "../service/vacancies.service.mjs";
import uploadFile from "../util/fileUploader.mjs";

export const getVacancies = async (req, res) => {
  try {
    
    const vacancies = await VacanciesService.getVacancies({
      search: req.query.search,
      sortBy: req.query.sortBy,
      order: req.query.order,
      limit: req.query.limit,
      page: req.query.page,
      cat: req.query.cat,
    });
    res.status(200).json(vacancies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getVacancy = async (req, res) => {
  try {
    const vacancy = await VacanciesService.getVacancy(req.params.id);
    res.status(200).json(vacancy);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createVacancy = async (req, res) => {
  try {
    let revievedVacancvy = req.body;
    if (req?.files?.thumbnail?.tempFilePath) {
      const uploadedResponse = await uploadFile(req.files.thumbnail.tempFilePath, req.files.thumbnail.name, "vacancy");
      revievedVacancvy = { ...req.body, thumbnail: uploadedResponse };
    }
    const vacancy = await VacanciesService.createVacancy(revievedVacancvy);
    res.status(201).json(vacancy);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updateVacancy = async (req, res) => {
  try {

    let revievedVacancvy = req.body;
    if (req?.files?.thumbnail?.tempFilePath) {
      const uploadedResponse = await uploadFile(req.files.thumbnail.tempFilePath, req.files.thumbnail.name, "vacancy");
         revievedVacancvy = { ...revievedVacancvy, thumbnail: uploadedResponse };
    }
    const vacancy = await VacanciesService.updateVacancy(req.params.id, revievedVacancvy);
    res.status(200).json(vacancy);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteVacancy = async (req, res) => {
  try {
    await VacanciesService.deleteVacancy(req.params.id);
    res.status(200).json({ message: "Vacancy deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
