import apiClient from "./axios.default";

const basePath = "vacancies";

export const getVacancies = async (filter) => {
  try {
    const reponse = await apiClient.get(`/${basePath}`, {
      params: filter,
    });
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

export const updateVacancy = async (data) => {
  try {
    const { id, ...rest } = data;
    console.log("rest", rest);
    const response = await apiClient.patch(`/${basePath}/${id}`, rest, {
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
