// src/utils/axios.js
import axios from "axios";
import useAuthStore from "../store/authStore"; // Import the Zustand store
import API_CONFIG from "./apiConstants";

const BASE_URL = API_CONFIG.API_ENDPOINT;
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/v1`,
  withCredentials: true, // Send cookies with the request
});

// Request Interceptor: Attach token to each request
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken; // Get the current access token
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // Set the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response, // If response is OK, return it
  async (error) => {
    const { status } = error.response || {};
    if (status === 401) {
      // Access token expired, try refreshing
      try {
        const refreshResponse = await axios.post(
          "/v1/auth/refresh-token", // Your backend refresh token route
          {},
          { withCredentials: true }
        );
        const { accessToken } = refreshResponse.data;

        // Store the new access token in memory using Zustand
        useAuthStore.getState().setAccessToken(accessToken);

        // Retry the original request with the new access token
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(error.config); // Retry the failed request
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        // Handle token refresh failure, e.g., logout user
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
