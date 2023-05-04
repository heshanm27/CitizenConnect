import apiClient from "./axios.default";

export const SignUpApiCall = async (data) => {
  try {
    const reponse = await apiClient.post("/auth/signup", data);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
export const SignInApiCall = async (data) => {
  try {
    const response = await apiClient.post("/auth/signin", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
