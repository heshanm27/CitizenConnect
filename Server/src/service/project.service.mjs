import Project from "../models/project.model.mjs";
import { BadRequestError, CustomError } from "../error/index.mjs";

export const getProjects = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1" }) => {
  try {
    return await Project.find()
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const getProject = async (id) => {
  try {
    const project = await Project.findById(id);
    if (!project) {
      throw new BadRequestError("Project not found");
    }
    return project;
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const createProject = async (project) => {
  const newProject = new Project(project);
  try {
    return await newProject.save();
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const deleteProject = async (id) => {
  try {
    return await Project.findByIdAndDelete(id);
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const updateProject = async (id, project) => {
  try {
    return await Project.findByIdAndUpdate(id, project, { new: true });
  } catch (error) {
    throw new CustomError(error.message);
  }
};
