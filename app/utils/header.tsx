import { useNavigate } from "@remix-run/react";
import { useTheme } from "../contexts/themeContext";
import ThemeToggleButton from "./common/ThemeToggleButton";
import { IoLogOut } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleLogout = () => {
    // session should be killed here
    navigate("/");
  };

  return (
    <nav
      className={`bg-white ${
        isDarkMode ? "dark:bg-gray-900" : "bg-white"
      } fixed w-full z-20 top-0 start-0 border-b border-gray-200 ${
        isDarkMode ? "dark:border-gray-600" : "border-gray-200"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://github.com/leocodeio"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="./favicon.ico"
            className={`h-8 border-2 ${
              isDarkMode ? "border-white" : "border-black"
            }`}
            alt="Flowbite Logo"
          />
        </a>
        <div className="flex md:order-2 gap-2">     
          <ThemeToggleButton />
          <button
            className={`text-xl font-semibold ${
              isDarkMode ? "dark:text-white" : "text-gray-900"
            }`}
            onClick={handleLogout}
          >
            <IoLogOut size={35} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
