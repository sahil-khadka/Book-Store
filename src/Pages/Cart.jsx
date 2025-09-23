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
  const user = useSelector((state) => state.userState.user);
  const cartItems = useSelector((state) => state.cart.items);
  const [theme, setTheme] = useState(getThemeLocal());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getThemeLocal());
    };

    window.addEventListener("themeChange", handleThemeChange);

    const handleStorage = (e) => {
      if (e.key === "theme") {
        setTheme(getThemeLocal());
      }
    };
    window.addEventListener("storage", handleStorage);

    const interval = setInterval(() => {
      const currentTheme = getThemeLocal();
      if (currentTheme !== theme) {
        setTheme(currentTheme);
      }
    });

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, [theme]);

  const handleIncreaseQuantity = (id, currentQuantity) => {
    console.log(
      "Increasing quantity for item:",
      id,
      "from",
      currentQuantity,
      "to",
      currentQuantity + 1
    );
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecreaseQuantity = (id, currentQuantity) => {
    console.log("Decreasing quantity for item:", id, "from", currentQuantity);
    if (currentQuantity <= 1) {
      console.log("Removing item:", id);
      dispatch(removeItem(id));
    } else {
      console.log("New quantity:", currentQuantity - 1);
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const handleRemoveItem = (id) => {
    console.log("Removing item:", id);
    dispatch(removeItem(id));
  };

  const getItemPrice = (item) => {
    const info = item.volumeInfo;
    const isFeatured = !info;

    let price = 0;

    if (item.calculatedPrice) {
      price = item.calculatedPrice;
    } else if (item.saleInfo?.retailPrice?.amount) {
      price = item.saleInfo.retailPrice.amount;
    } else if (isFeatured && item.price) {
      if (typeof item.price === "string") {
        price = parseFloat(item.price.replace("$", ""));
      } else {
        price = item.price;
      }
    } else {
      price = 20; // Default price
    }

    return Math.abs(price) || 20;
  };

  const getTotalPrice = () => {
    const total = cartItems.reduce((total, item) => {
      const price = getItemPrice(item);
      return total + price * (item.quantity || 1);
    }, 0);

    return total.toFixed(2);
  };

  const handleCheckout = () => {
    if (!user) {
      // User is not logged in, show alert and redirect to login
      alert("Please sign in first to proceed with checkout");
      navigate("/login", { state: { from: "/cart" } }); // Pass current location for redirect after login
      return;
    }
    navigate("/checkout");
  };

  const isDark = theme === themes.dracula;

  // Debug: Log cart items to see their structure
  console.log("Cart Items:", cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900 flex items-center justify-center p-4">
        <div className="text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-2L4 1M7 13L5.4 5M7 13l-2.293 2.293c-.395.395-.395 1.036 0 1.431L7 19M17 13l2.293 2.293c.395.395.395 1.036 0 1.431L17 19M17 13h-4M9 19h8"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Add some books to get started!
          </p>
          <Link
            to="/product"
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative">
      <img
        src="https://images.unsplash.com/photo-1709385283538-d3258a461032?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJvb2tzdG9yZXxlbnwwfHwwfHx8MA%3D%3D"
        alt="Books background"
        className="absolute inset-0 w-full h-full object-cover opacity-5"
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Shopping Cart
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 backdrop-blur-sm bg-opacity-90">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                  <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                    {cartItems.length}
                  </span>
                  Items in Cart
                </h2>

                <div className="space-y-6">
                  {cartItems.map((item) => {
                    const info = item.volumeInfo;
                    const isFeatured = !info;
                    const title = isFeatured ? item.title : info?.title;
                    const authors = isFeatured
                      ? item.author
                      : info?.authors
                      ? info.authors.join(", ")
                      : "Unknown";
                    const image = isFeatured
                      ? item.image
                      : info?.imageLinks?.thumbnail;
                    const price = getItemPrice(item);
                    const quantity = item.quantity || 1;

                    // Debug log for each item
                    console.log("Item:", item.id, "Quantity:", quantity);

                    return (
                      <div
                        key={item.id}
                        className="group bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-start space-x-6">
                          <Link
                            to={`/singleproduct/${item.id}`}
                            className="flex-shrink-0 cursor-pointer"
                          >
                            <img
                              src={image}
                              alt={title}
                              className="w-24 h-32 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-200"
                            />
                          </Link>

                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/singleproduct/${item.id}`}
                              className="block cursor-pointer"
                            >
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                {title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {authors}
                              </p>
                              <div className="flex items-center mt-3">
                                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                  ${price.toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                                  per item
                                </span>
                              </div>
                            </Link>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-lg overflow-hidden">
                                {/* Decrease Button */}
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleDecreaseQuantity(item.id, quantity);
                                  }}
                                  className="w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 cursor-pointer border-r border-gray-200 dark:border-gray-600"
                                >
                                  <svg
                                    className="w-5 h-5 font-bold"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M20 12H4"
                                    />
                                  </svg>
                                </button>

                                {/* Quantity Display */}
                                <div className="w-16 h-12 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    {quantity}
                                  </span>
                                </div>

                                {/* Increase Button */}
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleIncreaseQuantity(item.id, quantity);
                                  }}
                                  className="w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 cursor-pointer border-l border-gray-200 dark:border-gray-600"
                                >
                                  <svg
                                    className="w-5 h-5 font-bold"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                  </svg>
                                </button>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleRemoveItem(item.id);
                                }}
                                className="flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors cursor-pointer"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                <span className="text-sm font-medium">
                                  Remove
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      FREE
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span className="text-indigo-600 dark:text-indigo-400">
                        ${getTotalPrice()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleCheckout}
                    className={`w-full ${
                      user
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl transform hover:scale-105"
                        : "bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-xl transform hover:scale-105"
                    } text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          user
                            ? "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            : "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        }
                      />
                    </svg>
                    <span>
                      {user
                        ? "Proceed to Checkout"
                        : "Sign In First to Proceed"}
                    </span>
                  </button>

                  <Link
                    to="/product"
                    className="w-full block text-center border-2 border-indigo-200 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 py-3 px-6 rounded-2xl font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Secure Checkout
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Free Returns
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
