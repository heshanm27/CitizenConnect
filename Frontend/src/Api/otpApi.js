import apiClient from "./axios.default";

const basePath = "otp";



export const requestOTP = async (data) => {
  try {
    console.log("data", data)
    const reponse = await apiClient.post(`/${basePath}/request`, {
      email: data,
    });
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


export const validateOTP = async (data) => {
    try {
      const reponse = await apiClient.post(`/${basePath}/verify`, data);
      return reponse.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };