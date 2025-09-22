import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notimg from "../assets/not-found.jpeg";
import pro from "../assets/pro.png";

const THEMES = { winter: "winter", dracula: "dracula" };
const getThemeLocal = () => localStorage.getItem("theme") || THEMES.winter;

const getThemeClasses = (isDark) => ({
  bg: isDark ? "bg-gray-900" : "bg-gray-100",
  card: isDark ? "bg-gray-800" : "bg-white",
  text: isDark ? "text-white" : "text-black",
  textGray: isDark ? "text-gray-300" : "text-gray-600",
  textGray800: isDark ? "text-gray-200" : "text-gray-800",
  button: isDark
    ? "bg-gray-700 hover:bg-gray-600"
    : "bg-gray-200 hover:bg-gray-300",
});

const generateFixedPrice = (id) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) & 0xffffffff;
  }
  return ((hash % 100) + 20).toFixed(2);
};

const SingleProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const [theme, setTheme] = useState(getThemeLocal());
  const [quantity, setQuantity] = useState(1);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Get book from router state (Product page) or from cart (Cart page)
  const book = location.state?.book || cartItems.find((item) => item.id === id);

  const info = book?.volumeInfo;
  const price = Math.abs(
    book?.saleInfo?.retailPrice?.amount ||
      parseFloat(generateFixedPrice(book?.id || id))
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          setTheme(
            document.documentElement.getAttribute("data-theme") || THEMES.winter
          );
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  if (!book)
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-bold text-red-500">
        Book not found.
      </div>
    );

  const classes = getThemeClasses(theme === THEMES.dracula);

  // Check if book is already in cart and get its current quantity
  const existingCartItem = cartItems.find((item) => item.id === book.id);
  const isInCart = !!existingCartItem;
  const currentCartQuantity = existingCartItem?.quantity || 0;

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => Math.min(prev + 1, 10)); // Max 10 items
    } else if (type === "decrease") {
      setQuantity((prev) => Math.max(prev - 1, 1)); // Min 1 item
    }
  };

  const handleAddToCart = () => {
    // Create the item object with the selected quantity
    const itemToAdd = {
      ...book,
      quantity: quantity, // This will be the quantity selected from the UI
      calculatedPrice: Math.abs(price), // Ensure positive price
    };

    dispatch(addItem(itemToAdd));
    toast.success(`${quantity} book(s) added to cart!`);
  };

  const totalPrice = Math.abs(price * quantity).toFixed(2);

  return (
    <>
      <img
        src={pro}
        alt="Books background"
        className="fixed inset-0 w-full h-full object-cover -z-10"
        style={{ opacity: 0.5 }}
      />
      <div
        className={`min-h-screen ${
          theme === "dracula" ? "bg-gray-900/70" : "bg-white/70"
        } backdrop-blur-sm pt-24 pb-16`}
      >
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Hero Section */}
          <div
            className={`${
              theme === "dracula" ? "bg-gray-800" : "bg-white"
            } rounded-3xl shadow-2xl overflow-hidden mb-12 border border-gray-200`}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-12 flex items-center justify-center min-h-[600px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                <div className="relative z-10 group">
                  <div className="bg-white rounded-2xl p-8 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                    <img
                      src={info?.imageLinks?.thumbnail || notimg}
                      alt={info?.title}
                      className="w-80 h-auto max-h-96 object-contain mx-auto rounded-xl shadow-lg"
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
                </div>
              </div>

              {/* Content Section */}
              <div
                className={`${
                  theme === "dracula" ? "bg-gray-800" : "bg-white"
                } p-12 flex flex-col justify-center`}
              >
                <div className="space-y-8">
                  {/* Price Badge */}
                  <div className="flex justify-between items-start">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full text-2xl font-bold shadow-lg">
                      ${Math.abs(price).toFixed(2)}
                    </div>
                    {info?.averageRating && (
                      <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={`text-xl ${
                                i < Math.floor(info.averageRating)
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-700 font-semibold">
                          {info.averageRating}/5
                        </span>
                        {info.ratingsCount && (
                          <span className="text-gray-500 text-sm">
                            ({info.ratingsCount})
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h1
                    className={`text-4xl lg:text-5xl font-bold leading-tight ${
                      theme === "dracula" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {info?.title}
                  </h1>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p
                      className={`text-xl font-medium ${
                        theme === "dracula" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      by{" "}
                      <span className="font-bold text-blue-600">
                        {info?.authors?.join(", ") || "Unknown Author"}
                      </span>
                    </p>
                  </div>

                  {/* Current Cart Status */}
                  {isInCart && (
                    <div
                      className={`p-4 rounded-xl border-2 border-blue-500 ${
                        theme === "dracula" ? "bg-blue-900/20" : "bg-blue-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500 text-xl">✓</span>
                        <span
                          className={`font-semibold ${
                            theme === "dracula"
                              ? "text-blue-300"
                              : "text-blue-700"
                          }`}
                        >
                          Already in cart: {currentCartQuantity} item(s)
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 gap-6">
                    {info?.publishedDate && (
                      <div
                        className={`p-4 rounded-xl ${
                          theme === "dracula" ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <p
                          className={`text-sm font-semibold ${
                            theme === "dracula"
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          Published
                        </p>
                        <p
                          className={`text-lg font-bold ${
                            theme === "dracula" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {new Date(info.publishedDate).getFullYear()}
                        </p>
                      </div>
                    )}
                    {info?.pageCount && (
                      <div
                        className={`p-4 rounded-xl ${
                          theme === "dracula" ? "bg-gray-700" : "bg-gray-50"
                        }`}
                      >
                        <p
                          className={`text-sm font-semibold ${
                            theme === "dracula"
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          Pages
                        </p>
                        <p
                          className={`text-lg font-bold ${
                            theme === "dracula" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {info.pageCount}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Quantity Selector */}
                  <div
                    className={`p-6 rounded-2xl ${
                      theme === "dracula" ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`text-lg font-semibold ${
                            theme === "dracula" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Quantity to Add
                        </p>
                        <p
                          className={`text-sm ${
                            theme === "dracula"
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          Select amount to add to cart
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleQuantityChange("decrease")}
                          disabled={quantity <= 1}
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200 ${
                            quantity <= 1
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110"
                          }`}
                        >
                          −
                        </button>
                        <span
                          className={`text-3xl font-bold min-w-[3rem] text-center ${
                            theme === "dracula" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange("increase")}
                          disabled={quantity >= 10}
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-200 ${
                            quantity >= 10
                              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                              : "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110"
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <div className="flex justify-between items-center">
                        <span
                          className={`text-lg font-semibold ${
                            theme === "dracula"
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
                        >
                          Total Price:
                        </span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          ${totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 px-8 rounded-2xl text-xl font-bold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white shadow-xl hover:shadow-2xl"
                  >
                    {isInCart
                      ? `Add ${quantity} More to Cart`
                      : `Add ${quantity} to Cart`}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          {info?.description && (
            <div
              className={`${
                theme === "dracula" ? "bg-gray-800" : "bg-white"
              } rounded-3xl shadow-2xl p-12 border border-gray-200`}
            >
              <h2
                className={`text-3xl font-bold mb-8 ${
                  theme === "dracula" ? "text-white" : "text-gray-900"
                }`}
              >
                About This Book
              </h2>
              <div
                className={`prose prose-lg max-w-none ${
                  theme === "dracula" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <p className="text-xl leading-relaxed">{info.description}</p>
              </div>

              {/* Categories */}
              {info?.categories && (
                <div className="mt-8">
                  <h3
                    className={`text-xl font-bold mb-4 ${
                      theme === "dracula" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {info.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-semibold shadow-lg"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ToastContainer theme={theme === THEMES.dracula ? "dark" : "light"} />
    </>
  );
};

export default SingleProduct;
