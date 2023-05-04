export const getProjects = async () => {
  try {
    const reponse = await apiClient.get("/projects");
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getProject = async (id) => {
  try {
    const reponse = await apiClient.get(`/projects/${id}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createProject = async (data) => {
  try {
    const reponse = await apiClient.post("/projects", data);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateProject = async (id, data) => {
  try {
    const response = await apiClient.patch(`/projects/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await apiClient.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
