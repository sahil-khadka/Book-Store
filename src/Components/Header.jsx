import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { logoutUser } from "../features/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  const theme = useSelector((state) => state.userState.theme);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    setTimeout(() => {
      navigate("/");
    }, 60);
  };

  return (
    <header
      className={`${
        theme === "dracula" ? "bg-gray-900" : "bg-gray-300"
      } w-full py-1 shadow-lg border-b ${
        theme === "dracula" ? "border-gray-700" : "border-gray-300"
      }`}
    >
      <div className="flex justify-between items-center px-6">
        {/* Left side - Empty for balance or can add logo later */}
        <div></div>

        {/* Center - Auth links when not logged in */}
        {!user && (
          <div className="flex gap-4 justify-center items-center">
            <Link
              to="/login"
              className="text-white font-medium text-xs bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded no-underline transition-colors duration-200 cursor-pointer"
            >
              SignIn/Guest User
            </Link>
            <Link
              to="/Register"
              className="text-white font-medium text-xs bg-green-600 hover:bg-green-700 px-4 py-2 rounded no-underline transition-colors duration-200 cursor-pointer"
            >
              Create Account
            </Link>
          </div>
        )}

        {/* Right side - User info when logged in */}
        {user && (
          <div
            className={`flex items-center gap-3 ${
              theme === "dracula" ? "bg-gray-500" : "bg-white"
            } rounded-lg px-4 py-2 border ${
              theme === "dracula" ? "border-gray-600" : "border-gray-200"
            }`}
          >
            {/* Person icon */}
            <div
              className={`w-8 h-8 ${
                theme === "dracula" ? "bg-gray-600" : "bg-gray-300"
              } rounded-full flex items-center justify-center`}
            >
              <svg
                className={`w-5 h-5 ${
                  theme === "dracula" ? "text-gray-300" : "text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p
              className={`text-sm font-medium ${
                theme === "dracula" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Hello, {user.username}
            </p>
            <button
              className="text-xs font-semibold border border-red-500 text-red-500 bg-white px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-colors duration-200 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
