import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { BsCart4, BsMoonFill, BsSunFill } from "react-icons/bs";
import NavLinks from "./NavLinks";
import { useSelector } from "react-redux";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const getThemeLocal = () => {
  return localStorage.getItem("theme") || themes.winter;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Theme toggle
  const [theme, setTheme] = useState(getThemeLocal());
  const handleTheme = () => {
    const { winter, dracula } = themes;
    const newTheme = theme === winter ? dracula : winter;
    setTheme(newTheme);
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

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
    <nav className="bg-base-200 relative">
      <div className="align-element rounded-2xl text-base-content grid grid-cols-3 items-center">
        <div className="justify-self-start">
          <NavLink
            to="/"
            className="bg-base-200 text-base-content flex items-center justify-center font-bold w-18 lg:flex text-3xl mt-3 mb-3 rounded-lg px-5 py-3 hover:bg-gray-400 transition-all"
          >
            BK
          </NavLink>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
            <FaBarsStaggered className="h-9 w-9 mt-2 mb-2" />
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="bg-base-100">
              <ul
                ref={dropdownRef}
                className="absolute left-3 mt-2 p-5 bg-base-200 rounded-lg shadow-lg"
              >
                <li className="rounded-2xl hover:bg-base-300">
                  <NavLinks isDropdown={true} />
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="justify-self-center hidden lg:flex">
          <ul className="flex gap-15 font-bold">
            <NavLinks isDropdown={false} />
          </ul>
        </div>
        <div className="justify-self-end absolute top-5 right-19  transition-colors flex gap-4">
          <div className="ml-2 items-center flex">
            <label className="swap swap-rotate">
              <input type="checkbox" onChange={handleTheme} />
              <BsSunFill className="swap-on h-7 w-7" />
              <BsMoonFill className="swap-off h-7 w-7" />
            </label>
          </div>
          <NavLink to="/cart" className="">
            <div className="relative inline-block">
              <BsCart4 className="h-10 w-9 p-1 rounded border border-base-content" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-content text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
