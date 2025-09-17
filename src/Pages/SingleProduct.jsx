import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice"; // <-- import your action

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
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Get book from router state (Product page) or from cart (Cart page)
  const book = location.state?.book || cartItems.find((item) => item.id === id);

  const info = book?.volumeInfo;
  const price =
    book?.saleInfo?.retailPrice?.amount ||
    parseFloat(generateFixedPrice(book?.id || id));

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
      dispatch(
        addItem({
          ...book,
          quantity: 1,
          calculatedPrice: price,
        })
      );
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
              src={info.imageLinks?.thumbnail}
              alt={info.title}
              className=" w-80 rounded border-2 "
            />
            <div className="flex-1">
              <h1 className={`text-3xl font-bold mb-4 ${classes.text}`}>
                {info.title}
              </h1>
              <p className={`text-lg ${classes.textGray} mb-2`}>
                By: {info.authors?.join(", ") || "Unknown"}
              </p>
              {info.averageRating && (
                <p className={`${classes.textGray} mb-2`}>
                  Rating: {info.averageRating}/5{" "}
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i < Math.floor(info.averageRating)
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                  {info.ratingsCount && ` (${info.ratingsCount} ratings)`}
                </p>
              )}
              <p
                className={`text-xl ${classes.textGray800} font-semibold mb-4`}
              >
                Price: ${Math.abs(price).toFixed(2)}
              </p>
              <p className={`${classes.textGray} mb-6`}>
                {info.description || "No description available."}
              </p>
              <button
                className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 transition duration-300 hover:cursor-pointer "
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

export default SingleProduct;
