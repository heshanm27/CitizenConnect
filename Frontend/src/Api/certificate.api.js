export const getCertificates = async () => {
  try {
    const reponse = await apiClient.get("/certificates");
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getCertificate = async (id) => {
  try {
    const reponse = await apiClient.get(`/certificates/${id}`);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createCertificate = async (data) => {
  try {
    const reponse = await apiClient.post("/certificates", data);
    return reponse.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateCertificate = async (id, data) => {
  try {
    const response = await apiClient.patch(`/certificates/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteCertificate = async (id) => {
  try {
    const response = await apiClient.delete(`/certificates/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
