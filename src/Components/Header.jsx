import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header
      className="headerBG w-full h-10"
      style={{ backgroundColor: "rgba(57,50,128,1)" }}
    >
      <div className=" flex justify-center sm:justify-end px-4 ">
        <div className="flex gap-x-6  justify-center items-center">
          <Link
            to="/login"
            className="text-white font-bold hover:text-lime-500 text-xs sm:text-sm"
          >
            SignIn/Guest User
          </Link>
          <Link
            to="/Register"
            className="text-white font-bold hover:text-lime-500 text-xs sm:text-sm"
          >
            Create Account
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
