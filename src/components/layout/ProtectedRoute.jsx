import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProtectedRoute = () => {
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
