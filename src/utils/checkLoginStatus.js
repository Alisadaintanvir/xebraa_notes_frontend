import useAuthStore from "../store/authStore";
import axios from "axios";
import API_CONFIG from "./apiConstants";
import { toast } from "react-hot-toast";

const BASE_URL = API_CONFIG.API_ENDPOINT;

export const checkLoginStatus = async () => {
  const { setAccessToken, setIsLoggedIn, setUser } = useAuthStore.getState();

  try {
    const res = await axios.get(`${BASE_URL}/v1/auth/refresh-token`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      const { accessToken, user } = res.data;
      setAccessToken(accessToken);
      setUser(user || null);
      setIsLoggedIn(true);
      return true; // success
    }
  } catch (error) {
    // Check if it's an expected "not logged in" or a real server error
    if (error.response) {
      // Refresh token invalid/expired
      console.warn("User not logged in or refresh token expired");
    } else {
      // Network or server error
      toast.error("Network error. Please try again.");
      console.error("Network/server error while checking login status:", error);
    }

    // Clear auth state on failure
    setAccessToken(null);
    setIsLoggedIn(false);
    setUser(null);

    return false; // failure
  }
};
