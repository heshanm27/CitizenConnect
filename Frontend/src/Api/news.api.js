import apiClient from "./axios.default";

const basePath = "news";

export const getNews = async (filter) => {
  try {
    const reponse = await apiClient.get(`/${basePath}`, {
      params: filter,
    });
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getOneNews = async (id) => {
  try {
    const reponse = await apiClient.get(`/${basePath}/${id}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createNews = async (data) => {
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

export const updateNews = async (id, data) => {
  try {
    const response = await apiClient.patch(`/${basePath}/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteNews = async (id) => {
  try {
    const response = await apiClient.delete(`/${basePath}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
