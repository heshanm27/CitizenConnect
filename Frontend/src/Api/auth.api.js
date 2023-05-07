import apiClient from "./axios.default";
const basePath = "auth";

export const SignUpApiCall = async (data) => {
  try {
    const reponse = await apiClient.post(`/${basePath}/signup`, data);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const SignInApiCall = async (data) => {
  try {
    const response = await apiClient.post(`/${basePath}/signin`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
