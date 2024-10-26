// app/components/Header.tsx
import { useNavigate } from "@remix-run/react";
import { useTheme } from "../../contexts/themeContext";
import ThemeToggleButton from "./ThemeToggleButton";
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
      className={`h-16 bg-white ${
        isDarkMode ? "dark:bg-[#1e1e1e]" : "bg-white"
      } fixed w-full z-50 top-0 start-0 border-b border-gray-200 ${
        isDarkMode ? "dark:border-gray-600" : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mx-auto p-4 h-full">
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
          <p
            className={`text-xl font-semibold ${
              isDarkMode ? "dark:text-white" : "text-gray-900"
            }`}
          >
            AlgoLeveling
          </p>
        </a>
        <div className="flex md:order-2 gap-2">
          <ThemeToggleButton />
          <button
            className={`text-xl font-semibold ${
              isDarkMode ? "dark:text-white" : "text-gray-900"
            }`}
            onClick={handleLogout}
          >
            <IoLogOut size={30} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
