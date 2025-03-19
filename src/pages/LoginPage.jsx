import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/ui/LoginForm";
import axios from "axios";
import API_CONFIG from "../utils/apiConstants";
import { toast } from "react-hot-toast";
import useAuthStore from "../store/authStore";
import { checkLoginStatus } from "../utils/checkLoginStatus";

const BASE_URL = API_CONFIG.API_ENDPOINT;

function LoginPage() {
  const { setAccessToken, setIsLoggedIn, setUser } = useAuthStore();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const response = await axios.post(
        `${BASE_URL}/v1/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { accessToken, user } = response.data;
        setAccessToken(accessToken);
        setIsLoggedIn(true);
        setUser(user);
        toast.success("Login successful");
        navigate("/");
      }

      return response.data;
    } catch (error) {
      if (error.response) {
        // Extract the backend error message
        const errorMessage = error.response.data.message || "Error signing in";
        toast.error(errorMessage);
      } else {
        toast.error("Network error. Please try again.");
      }
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Sign In
        </h2>

        <LoginForm onSubmit={onSubmit} />

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <Link
            to="/signup"
            className="text-slate-700 hover:text-slate-900 font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
