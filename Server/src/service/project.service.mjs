import Project from "../models/project.model.mjs";
import { BadRequestError, CustomError } from "../error/index.mjs";

export const getProjects = async ({ search = "", year = "", sortBy = "createdAt", order = "-1", limit = "500", page = "1" }) => {
  try {

    console.log(year)
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    if (year) {
      query.year_of_allocation = year;
    }
    const projetData = await Project.find(query)
      .sort({ [sortBy]: order })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit)).populate("year_of_allocation");
    //find count for matching products
    const totalDocCount = await Project.countDocuments(query)
      .sort({
        [sortBy]: order,
      })
      .count();

    const total = Math.ceil(totalDocCount / limit);
    return { projetData, total };
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const getProject = async (id) => {
  try {
    const project = await Project.findById(id).populate("year_of_allocation");
    if (!project) {
      throw new BadRequestError("Project not found");
    }
    return project;
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const createProject = async (project) => {
  try {
    return await Project.create(project);
  } catch (error) {
    throw new CustomError(error.message);
  }
};

export const deleteProject = async (id) => {
  try {
    console.log("deleteProject", id);
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
