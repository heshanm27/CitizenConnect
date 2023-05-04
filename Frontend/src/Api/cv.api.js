export const getCVs = async () => {
  try {
    const reponse = await apiClient.get("/cvs");
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getCV = async (id) => {
  try {
    const reponse = await apiClient.get(`/cvs/${id}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createCV = async (data) => {
  try {
    const reponse = await apiClient.post("/cvs", data);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateCV = async (id, data) => {
  try {
    const response = await apiClient.patch(`/cvs/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteCV = async (id) => {
  try {
    const response = await apiClient.delete(`/cvs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
