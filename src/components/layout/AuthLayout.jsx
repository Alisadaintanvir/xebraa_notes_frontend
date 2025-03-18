import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const AuthLayout = () => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default AuthLayout;
