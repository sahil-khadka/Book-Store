import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header
      className="headerBG w-full h-7  pt-1"
      style={{ backgroundColor: "rgba(57,50,128,1)" }}
    >
      <div className=" flex justify-center sm:justify-end px-4 ">
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
      </div>
    </header>
  );
};

export default Header;
