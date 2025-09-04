import { useEffect, useState } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full border h-10 w-10 dark:bg-gray-700 transition-colors flex items-center justify-center"
    >
      {theme === "dark" ? (
        <BsSunFill className="text-black text-xl" />
      ) : (
        <BsMoonFill className="text-gray-800 text-xl" />
      )}
    </button>
  );
};

export default ThemeToggle;
