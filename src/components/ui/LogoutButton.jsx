import { LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import API_CONFIG from "../../utils/apiConstants";
import { toast } from "react-hot-toast";

const BASE_URL = API_CONFIG.API_ENDPOINT;
function LogoutButton() {
  const navigate = useNavigate();
  const { setAccessToken, setIsLoggedIn } = useAuthStore();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/v1/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setAccessToken(null);
        setIsLoggedIn(false);
        toast.success("Logout successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="text-yellow-400 bg-gray-100 shadow-sm p-2 rounded-full hover:cursor-pointer hover:bg-gray-200"
    >
      <LogOut size={16} />
    </button>
  );
}

export default LogoutButton;
