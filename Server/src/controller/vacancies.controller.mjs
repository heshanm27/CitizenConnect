import * as VacanciesService from "../service/vacancies.service.mjs";

export const getVacancies = async (req, res) => {
  try {
    const vacancies = await VacanciesService.findAll();
    res.status(200).json(vacancies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getVacancy = async (req, res) => {
  try {
    const vacancy = await VacanciesService.findById(req.params.id);
    res.status(200).json(vacancy);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createVacancy = async (req, res) => {
  try {
    const vacancy = await VacanciesService.create(req.body);
    res.status(201).json(vacancy);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updateVacancy = async (req, res) => {
  try {
    const vacancy = await VacanciesService.update(req.params.id, req.body);
    res.status(200).json(vacancy);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteVacancy = async (req, res) => {
  try {
    await VacanciesService.delete(req.params.id);
    res.status(200).json({ message: "Vacancy deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
