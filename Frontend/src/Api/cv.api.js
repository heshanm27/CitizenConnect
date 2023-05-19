import apiClient from "./axios.default";

const basePath = "cv";

export const getCVs = async (id) => {
  try {
    const reponse = await apiClient.get(`/${basePath}/vacancy/${id}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getCV = async (id) => {
  try {
    const reponse = await apiClient.get(`/${basePath}/${id}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createCV = async (data) => {
  try {
    const reponse = await apiClient.post(`/${basePath}`, data);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateCV = async (id, data) => {
  try {
    const response = await apiClient.patch(`/${basePath}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteCV = async (id) => {
  try {
    const response = await apiClient.delete(`/${basePath}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
