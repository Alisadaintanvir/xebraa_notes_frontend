import { Link, useNavigate } from "react-router-dom";
import SignupForm from "../components/ui/SignupForm";
import axios from "axios";
import API_CONFIG from "../utils/apiConstants";
import { toast } from "react-hot-toast";

const BASE_URL = API_CONFIG.API_ENDPOINT;

function SignupPage() {
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const { email, password, name } = data;
      const response = await axios.post(`${BASE_URL}/v1/auth/register`, {
        email,
        password,
        name,
      });

      if (response.status === 201) {
        toast.success("Account created successfully");
        navigate("/login");
      }

      return response.data;
    } catch (error) {
      if (error.response) {
        // Extract the backend error message
        const errorMessage = error.response.data.message || "Error signing up";
        toast.error(errorMessage);
      } else {
        toast.error("Network error. Please try again.");
      }
      console.error("Error signing up:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create an account
        </h2>

        <SignupForm onSubmit={onSubmit} />

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="text-yellow-400 hover:text-yellow-500 font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
