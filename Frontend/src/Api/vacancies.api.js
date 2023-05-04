export const getVacancies = async () => {
  try {
    const reponse = await apiClient.get("/vacancies");
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getVacancy = async (id) => {
  try {
    const reponse = await apiClient.get(`/vacancies/${id}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createVacancy = async (data) => {
  try {
    const reponse = await apiClient.post("/vacancies", data);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateVacancy = async (id, data) => {
  try {
    const response = await apiClient.patch(`/vacancies/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteVacancy = async (id) => {
  try {
    const response = await apiClient.delete(`/vacancies/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
