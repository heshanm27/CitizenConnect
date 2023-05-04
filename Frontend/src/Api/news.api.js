export const getNews = async () => {
  try {
    const reponse = await apiClient.get("/news");
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getOneNews = async (id) => {
  try {
    const reponse = await apiClient.get(`/news/${id}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createNews = async (data) => {
  try {
    const reponse = await apiClient.post("/news", data);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateNews = async (id, data) => {
  try {
    const response = await apiClient.patch(`/news/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteNews = async (id) => {
  try {
    const response = await apiClient.delete(`/news/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
