import axios from "axios";
import store from "../Redux/store";
import { logOut } from "../Redux/auth.slice";
// import { logOut } from "../Redux/auth/authslice";
console.log("env",import.meta.env.BASE_URL)
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const excludedEndpoints = ["/auth/signIn", "/auth/signup"]; // List of excluded endpoints
apiClient.interceptors.request.use((config) => {
  // Check if the request URL matches any of the excluded endpoints
  if (!excludedEndpoints.some((endpoint) => config.url?.includes(endpoint))) {
    config.headers.Authorization = `Bearer ${store.getState().authSlice.accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Error: interceptor Token Expired", store.getState().authSlice.accessToken);
    if (error.response.status === 401) {
      // Remove the current token from the Redux store by dispatching a Redux action
      store.dispatch(logOut("Unauthorized,Please Sign Again")); // Dispatch your Redux action to remove the token
      window.location.href = "/admin/login";
    }

    // If the error is not related to token expiration, return it as is
    return Promise.reject(error);
  }
);

export default apiClient;
