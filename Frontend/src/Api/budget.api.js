import apiClient from "./axios.default";

const basePath = "budget";
export const getBudgets = async () => {
  try {
    console.log("budgets called");
    const reponse = await apiClient.get(`/${basePath}`);
    console.log("after budget called");
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getBudget = async (id) => {
  try {
    const reponse = await apiClient.get(`/${basePath}/${id}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createBudget = async (data) => {
  try {
    const reponse = await apiClient.post(`/${basePath}`, data);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateBudget = async (data) => {
  try {
    const { id, ...rest } = data;

    const response = await apiClient.patch(`/${basePath}/${id}`, rest);
    console.log("updateBudget", response.data);
    return response.data;
  } catch (error) {
    console.log("updateBudget", error);
    throw new Error(error.response.data.message);
  }
};

export const deleteBudget = async (id) => {
  try {
    const response = await apiClient.delete(`/${basePath}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
