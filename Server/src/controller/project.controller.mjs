import ProjectService from "../services/project.service.mjs";
import CLOUDINARY from "../config/cloudinary.config.mjs";
export const getProjects = async (req, res) => {
  try {
    const projects = await ProjectService.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await ProjectService.findById(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    let projectData = req.body;
    CLOUDINARY.image(
      req.file.path,
      {
        folder: "projects",
        use_filename: true,
        unique_filename: false,
      },
      async (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        projectData = await ProjectService.create({ ...req.body, thumbnail: result.secure_url });
      }
    );
    const project = await ProjectService.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await ProjectService.update(req.params.id, req.body);
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
