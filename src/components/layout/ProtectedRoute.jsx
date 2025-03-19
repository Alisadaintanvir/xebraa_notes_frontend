import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import Loading from "../ui/Loading";

const ProtectedRoute = () => {
  const location = useLocation();
  const { isLoggedIn, isLoading } = useAuthStore();

  if (isLoading) {
    return <Loading />;
  }

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
