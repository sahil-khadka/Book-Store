import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FeaturedBook from "../Components/FeaturedBook";

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

const FeaturePage = () => {
  const { id } = useParams();
  const book = FeaturedBook.find((b) => b.id === id);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [theme, setTheme] = useState(getThemeLocal());

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

  if (!book) return <div className="text-red-500">Book not found.</div>;

  const classes = getThemeClasses(theme === THEMES.dracula);

  // Check if book is already in cart
  const isInCart = cartItems.some((item) => item.id === book.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch({
        type: "cart/addItem",
        payload: { ...book, quantity: 1 }, // set initial quantity
      });
    }
  };

  return (
    <>
      <img
        src={
          "https://images.squarespace-cdn.com/content/v1/5ab959d189c17212dbefbac3/cd6bfa7c-cd9b-4127-b779-379e292eb2ad/Liberty+Bay+Photo+Update.jpg"
        }
        alt="Books background"
        className="fixed top-0 left-0 object-cover -z-10 min-h-screen w-full"
        style={{ opacity: 0.7 }}
      />
      <div className={`${classes.bg} pt-8 pb-20 rounded-3xl`}>
        <div className="max-w-4xl mx-auto">
          <div
            className={`${classes.card} rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8`}
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-80 rounded border-2"
            />
            <div className="flex-1">
              <h1 className={`text-3xl font-bold mb-4 ${classes.text}`}>
                {book.title}
              </h1>
              <p className={`text-lg ${classes.textGray} mb-2`}>
                By: {book.author}
              </p>
              <p
                className={`text-xl ${classes.textGray800} font-semibold mb-4`}
              >
                Price: {book.price}
              </p>
              <p className={`${classes.textGray} mb-6`}>{book.description}</p>
              <button
                className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 transition duration-300 hover:cursor-pointer"
                onClick={handleAddToCart}
                disabled={isInCart}
              >
                {isInCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturePage;
