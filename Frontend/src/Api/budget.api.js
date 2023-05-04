export const getBudgets = async () => {
  try {
    const reponse = await apiClient.get("/budgets");
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getBudget = async (id) => {
  try {
    const reponse = await apiClient.get(`/budgets/${id}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createBudget = async (data) => {
  try {
    const reponse = await apiClient.post("/budgets", data);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateBudget = async (id, data) => {
  try {
    const response = await apiClient.patch(`/budgets/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteBudget = async (id) => {
  try {
    const response = await apiClient.delete(`/budgets/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
