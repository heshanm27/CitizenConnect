import apiClient from "./axios.default";
import store from "../Redux/store.js";
import { orderSave } from "../Redux/payment.slice";
const basePath = "certificate";
export const getCertificates = async (filter) => {
  try {
    const reponse = await apiClient.get(`/${basePath}`, {
      params: filter,
    });
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
    const response = await apiClient.post(`/${basePath}`, data);
    console.log("response", response);
    store.dispatch(orderSave(response?.data?.orderId));
    window.location.href = response?.data?.url;
    return response;
  } catch (error) {
    console.log("error certificate");
    console.log(error);
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

export const completeCertificateOrder = async (data) => {
  try {
    const { id, ...rest } = data;
    const response = await apiClient.post(`/${basePath}/complete/${id}`, rest, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw new Error(error.response.data.message);
  }
};
