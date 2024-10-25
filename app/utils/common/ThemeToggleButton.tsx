import React from "react";
import { useTheme } from "../../contexts/themeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? (
        <div className="flex items-center justify-center">
          <MdLightMode size={35} color="white" />
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <MdDarkMode size={35} color="black" />
        </div>
      )}
    </button>
  );
};

export default ThemeToggleButton;
