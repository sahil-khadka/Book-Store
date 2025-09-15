import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../features/cartSlice";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

const getThemeLocal = () => {
  return localStorage.getItem("theme") || themes.winter;
};

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [theme, setTheme] = useState(getThemeLocal());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getThemeLocal());
    };
    window.addEventListener("themeChange", handleThemeChange);
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = Math.abs(
          item.calculatedPrice || item.saleInfo?.retailPrice?.amount || 20
        );
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    alert(
      "Checkout functionality not implemented yet. Total: $" + getTotalPrice()
    );
    // Navigate to checkout page if you have one: navigate("/checkout");
  };

  const isDark = theme === themes.dracula;
  const bgClass = isDark ? "bg-gray-900" : "bg-gray-100";
  const cardBgClass = isDark ? "bg-gray-800" : "bg-white";
  const textClass = isDark ? "text-white" : "text-black";
  const textGrayClass = isDark ? "text-gray-300" : "text-gray-600";
  const textGray800Class = isDark ? "text-gray-200" : "text-gray-800";
  const buttonBgClass = isDark
    ? "bg-gray-700 hover:bg-gray-600"
    : "bg-gray-200 hover:bg-gray-300";
  const removeButtonClass = isDark
    ? "bg-red-700 hover:bg-red-800"
    : "bg-red-500 hover:bg-red-600";
  const checkoutButtonClass = isDark
    ? "bg-green-800 hover:bg-green-900"
    : "bg-green-600 hover:bg-green-700";
  const continueButtonClass = isDark
    ? "bg-gray-700 hover:bg-gray-800"
    : "bg-gray-500 hover:bg-gray-600";

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen ${bgClass} py-8`}>
        <div
          className={`max-w-4xl mx-auto ${cardBgClass} rounded-lg shadow-lg p-8 text-center`}
        >
          <h1 className={`text-3xl font-bold mb-4 ${textClass}`}>
            Your Cart is Empty
          </h1>
          <p className={`${textGrayClass} mb-6`}>
            Add some books to get started!
          </p>
          <Link
            to="/product"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgClass} py-19 px-19 rounded-3xl`}>
      <div
        className={`max-w-6xl mx-auto ${cardBgClass} rounded-lg shadow-lg p-8`}
      >
        <h1 className={`text-3xl font-bold mb-6 ${textClass}`}>Your Cart</h1>
        <div className="space-y-4">
          {cartItems.map((item) => {
            const info = item.volumeInfo;
            const price = Math.abs(
              item.calculatedPrice || item.saleInfo?.retailPrice?.amount || 20
            );
            return (
              <div
                key={item.id}
                className={`flex items-center justify-between border-b pb-4 ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={info.imageLinks?.thumbnail}
                    alt={info.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className={`text-lg font-semibold ${textClass}`}>
                      {info.title}
                    </h2>
                    <p className={textGrayClass}>
                      {info.authors ? info.authors.join(", ") : "Unknown"}
                    </p>
                    <p className={`${textGray800Class} font-bold`}>
                      ${price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className={`${buttonBgClass} px-2 py-1 rounded`}
                    >
                      -
                    </button>
                    <span className={`px-3 ${textClass}`}>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className={`${buttonBgClass} px-2 py-1 rounded`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className={`${removeButtonClass} text-white px-4 py-2 rounded`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-between items-center">
          <h2 className={`text-2xl font-bold ${textClass}`}>
            Total: ${getTotalPrice()}
          </h2>
          <div className="space-x-4">
            <Link
              to="/product"
              className={`${continueButtonClass} text-white px-6 py-2 rounded transition duration-300`}
            >
              Continue Shopping
            </Link>
            <button
              onClick={handleCheckout}
              className={`${checkoutButtonClass} text-white px-6 py-2 rounded transition duration-300`}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
