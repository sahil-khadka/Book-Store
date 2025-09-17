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
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink
              to={url}
              end
              onClick={isDropdown ? () => setIsOpen(false) : undefined}
              className={({ isActive }) =>
                `capitalize px-5 py-4 rounded transition-all flex 
                ${
                  isActive
                    ? "bg-pink-600 text-white font-bold"
                    : "hover:bg-gray-400"
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
