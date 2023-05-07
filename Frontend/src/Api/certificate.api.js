import apiClient from "./axios.default";

const basePath = "certificate";
export const getCertificates = async () => {
  try {
    const reponse = await apiClient.get(`/${basePath}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getCertificate = async (id) => {
  try {
    const reponse = await apiClient.get(`/${basePath}/${id}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createCertificate = async (data) => {
  try {
    const reponse = await apiClient.post(`/${basePath}`, data);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateCertificate = async (id, data) => {
  try {
    const response = await apiClient.patch(`/${basePath}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteCertificate = async (id) => {
  try {
    const response = await apiClient.delete(`/${basePath}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
