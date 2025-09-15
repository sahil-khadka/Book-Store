import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(getThemeLocal());

  const { book, currentPage, query } = location.state || {};
  const info = book?.volumeInfo;
  const price =
    book?.saleInfo?.retailPrice?.amount ||
    parseFloat(generateFixedPrice(book?.id));

  useEffect(() => {
    if (!book) {
      navigate("/product");
      return;
    }
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
  }, [book, navigate]);

  const handleAddToCart = () => {
    if (!book) return;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === book.id);
    if (existing) existing.quantity += 1;
    else {
      // Store the calculated price
      cart.push({ ...book, calculatedPrice: price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Book added to cart!");
  };

  if (!book)
    return <div className="text-red-500">Book not found. Redirecting...</div>;

  const classes = getThemeClasses(theme === THEMES.dracula);

  return (
    <div className={`min-h-screen ${classes.bg} py-8`}>
      <div className="max-w-4xl mx-auto">
        <Link
          to="/product"
          state={{ currentPage, query }}
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back to Products
        </Link>
        <div
          className={`${classes.card} rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8`}
        >
          <img
            src={info.imageLinks?.thumbnail}
            alt={info.title}
            className="w-48 h-auto mx-auto md:mx-0 rounded"
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
            <p className={`text-xl ${classes.textGray800} font-semibold mb-4`}>
              Price: ${Math.abs(price).toFixed(2)}
            </p>
            <p className={`${classes.textGray} mb-6`}>
              {info.description || "No description available."}
            </p>
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
