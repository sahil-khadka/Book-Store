import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/", text: "Home" },
  { id: 2, url: "/about", text: "About" },
  { id: 3, url: "/product", text: "Product" },
  // { id: 4, url: "/cart", text: "Cart" },
  { id: 5, url: "/checkout", text: "Checkout" },
  // { id: 6, url: "/orders", text: "Orders" },
];

const NavLinks = ({ isDropdown, setIsOpen }) => {
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        if (text === "Checkout" && !user) return null;
        return (
          <li key={id}>
            <NavLink
              to={url}
              end
              onClick={isDropdown ? () => setIsOpen(false) : undefined}
              className={({ isActive }) =>
                `capitalize px-9 py-3 rounded transition-all flex 
                ${
                  isActive
                    ? "border-1  border-black font-extrabold hover:text-rose-00 hover:shadow-2xl text-rose-700 "
                    : "hover:shadow-lg hover:shadow-black hover:text-rose-700 "
                }
                ${
                  !isDropdown && text === "Cart"
                    ? "bg-black h-15 w-25 flex items-center justify-center text-white font-bold hover:bg-gray-200"
                    : ""
                }`
              }
            >
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavLinks;
