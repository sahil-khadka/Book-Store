import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { logoutUser } from "../features/userSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <header
      className="headerBG w-full h-7  pt-1"
      style={{ backgroundColor: "rgba(57,50,128,1)" }}
    >
      <div className=" flex justify-center sm:justify-end px-4 ">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center ">
            <p className="text-xs sm:text-sm text-white w-25 ">
              Hello, {user.username}
            </p>
            <button
              className="btn btn-xs btn-outline btn-primary border-white text-white w-25 "
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-5  justify-center items-center mr-10 ">
            <Link
              to="/login"
              className="text-black font-bold hover:text-lime-500 text-xs sm:text-sm bg-white pb-2 px-1  sm:pb-1"
            >
              SignIn/Guest User
            </Link>
            <Link
              to="/Register"
              className="text-black font-bold hover:text-lime-500 text-xs sm:text-sm bg-white pb-2 px-1 
             sm:pb-1"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
