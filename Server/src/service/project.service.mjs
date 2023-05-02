export const getProjects = async ({ search = "", sortBy = "createdAt", order = "-1", limit = "2", page = "1" }) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      projects,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const getProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.status(200).json({
      project,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const createProject = async (req, res) => {
  const project = req.body;
  const newProject = new Project(project);
  try {
    await newProject.save();
    res.status(201).json({
      newProject,
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await Project.findByIdAndDelete(id);
    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, budget, status, assignedTo, assignedBy, date } = req.body;
  const updatedProject = { title, description, budget, status, assignedTo, assignedBy, date, _id: id };
  await Project.findByIdAndUpdate(id, updatedProject, { new: true });
  res.json(updatedProject);
};
