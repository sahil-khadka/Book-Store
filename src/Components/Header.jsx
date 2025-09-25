import { NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { BsCart4, BsMoonFill, BsSunFill } from "react-icons/bs";
import NavLinks from "./NavLinks";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/userSlice";
import { clearCart } from "../features/cartSlice";
import { logoutUser } from "../features/userSlice";
import { Link } from "react-router-dom";

import React from "react";

const Header = () => {
  const theme = useSelector((state) => state.userState.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    setTimeout(() => {
      navigate("/");
    }, 60);
  };

  return (
    <>
      <div className="flex items-center space-x-4">
        {/* Auth Buttons or User Info */}
        {!user ? (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="text-white text-sm font-medium bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-300 hover:to-red-700 hover:scale-105 px-3 py-1.5 rounded transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/Register"
              className="text-white text-sm font-medium bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-300 hover:to-red-700 hover:scale-105 px-3 py-1.5 rounded transition-all duration-200"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium ${
                theme === "dracula" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-medium border border-red-500 text-red-500 bg-white px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
