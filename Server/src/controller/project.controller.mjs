import * as ProjectService from "../service/project.service.mjs";
import cloudinary from "../config/cloudinary.config.mjs";
import uploadFile from "../util/fileUploader.mjs";

export const getProjects = async (req, res) => {
  try {
    const projects = await ProjectService.getProjects({
      search: req.query.search,
      sortBy: req.query.sortBy,
      order: req.query.order,
      year: req.query.year,
      limit: req.query.limit,
      page: req.query.page,
    });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await ProjectService.getProject(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    console.log("file tem path", req.files);
    console.log("file tem path", req.files.thumbnail);

    const uploadedResponse = await uploadFile(req.files.thumbnail.tempFilePath, req.files.thumbnail.name, "project");
    const project = { ...req.body, thumbnail: uploadedResponse };
    const newProject = await ProjectService.createProject(project);
    console.log(uploadedResponse);
    res.status(201).json({ message: "Project created successfully", newProject });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const uploadedResponse = await uploadFile(req.files.thumbnail.tempFilePath, req.files.thumbnail.name, "project");
    const upproject = { ...req.body, thumbnail: uploadedResponse };
    const project = await ProjectService.update(req.params.id, upproject);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    await ProjectService.delete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
