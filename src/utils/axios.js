// src/utils/axios.js
import axios from "axios";
import useAuthStore from "../store/authStore"; // Zustand store
import API_CONFIG from "./apiConstants";

const BASE_URL = API_CONFIG.API_ENDPOINT;
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/v1`,
  withCredentials: true, // cookies for refreshToken
});

// Add request interceptor to add accessToken
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Add response interceptor to handle 401 errors and refresh tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { setAccessToken } = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Request a new access token using refresh token from cookies
        const response = await axios.get(`${BASE_URL}/v1/auth/refresh-token`, {
          withCredentials: true,
        });

        const newAccessToken = response.data.accessToken;

        // Store new access token in Zustand store
        setAccessToken(newAccessToken);

        // Update the authorization header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Optional: logout or redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
