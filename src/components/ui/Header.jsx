import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import useAuthStore from "../../store/authStore";

function Header() {
  const { user } = useAuthStore();
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-yellow-400  backdrop-blur-lg bg-opacity-80">
      <div className="mx-auto  px-12 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 items-stretch justify-start">
            <Link
              className="flex flex-shrink-0 items-center text-3xl font-bold text-white"
              to="#"
            >
              Xebraa Notes
            </Link>
          </div>
          <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
            <h2 className="text-white font-semibold">Hello, {user?.name}</h2>
          </div>
          <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
