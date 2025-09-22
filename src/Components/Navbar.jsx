import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { BsCart4, BsMoonFill, BsSunFill } from "react-icons/bs";
import NavLinks from "./NavLinks";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const theme = useSelector((state) => state.userState.theme);

  // Theme toggle
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav
      className={`${
        theme === "dracula" ? "bg-gray-800" : "bg-white"
      } shadow-md border-b ${
        theme === "dracula" ? "border-gray-700" : "border-gray-200"
      } sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu and logo */}
          <div className="flex items-center space-x-4">
            <NavLink
              to="/"
              className={`text-2xl font-bold ${
                theme === "dracula"
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-blue-600 hover:text-blue-700"
              } transition-colors duration-200`}
            >
              BK
            </NavLink>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden ${
                theme === "dracula"
                  ? "text-gray-300 hover:text-blue-400"
                  : "text-gray-600 hover:text-blue-600"
              } p-2 rounded transition-colors duration-200`}
            >
              <FaBarsStaggered className="text-lg" />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div
                className={`absolute top-16 left-0 w-full ${
                  theme === "dracula" ? "bg-gray-800" : "bg-white"
                } shadow-lg border-t ${
                  theme === "dracula" ? "border-gray-700" : "border-gray-200"
                } md:hidden z-50`}
              >
                <ul ref={dropdownRef} className="py-2">
                  <li className="px-4">
                    <NavLinks isDropdown={true} />
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-6">
              <NavLinks isDropdown={false} />
            </ul>
          </div>

          {/* Right side - Theme toggle and cart */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <div className="relative">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={handleTheme}
                  className="sr-only"
                />
                <div
                  className={`relative w-12 h-6 ${
                    theme === "dracula" ? "bg-gray-600" : "bg-gray-300"
                  } rounded-full p-1 transition-colors duration-300`}
                >
                  <div
                    className={`flex items-center justify-between w-full h-full text-xs ${
                      theme === "dracula" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <BsSunFill className="transition-opacity duration-300 text-amber-400" />
                    <BsMoonFill className="transition-opacity duration-300 text-black" />
                  </div>
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
                      theme === "dracula" ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </label>
            </div>

            {/* Cart */}
            <NavLink to="/cart" className="relative">
              <div
                className={`flex items-center ${
                  theme === "dracula"
                    ? "text-gray-300 hover:text-blue-400"
                    : "text-gray-600 hover:text-blue-600"
                } transition-colors duration-200 p-2 rounded`}
              >
                <BsCart4 className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
