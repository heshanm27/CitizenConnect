import apiClient from "./axios.default";

const basePath = "vacancies";

export const getVacancies = async () => {
  try {
    const reponse = await apiClient.get(`/${basePath}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getVacancy = async (id) => {
  try {
    const reponse = await apiClient.get(`/${basePath}/${id}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createVacancy = async (data) => {
  try {
    const reponse = await apiClient.post(`/${basePath}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateVacancy = async (id, data) => {
  try {
    const response = await apiClient.patch(`/${basePath}/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteVacancy = async (id) => {
  try {
    const response = await apiClient.delete(`/${basePath}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
