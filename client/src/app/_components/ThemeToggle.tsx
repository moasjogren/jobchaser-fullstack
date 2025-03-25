import { useContext } from "react";
import { ThemeContext } from "../_context/ThemeContext";
import { AiFillMoon, AiFillSun } from "react-icons/ai";
import { IconContext } from "react-icons";

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <IconContext.Provider value={{ size: "1.6rem" }}>
      <button className="theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? <AiFillSun /> : <AiFillMoon />}
      </button>
    </IconContext.Provider>
  );
};

export default ThemeToggle;
