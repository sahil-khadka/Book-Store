import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notimg from "../assets/not-found.jpeg";
import pro from "../assets/pro.png";

const THEMES = { winter: "winter", dracula: "dracula" };
const BOOKS_PER_PAGE = 6;

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
  pagination: isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700",
  paginationActive: isDark
    ? "bg-blue-700 text-white"
    : "bg-blue-600 text-white",
  searchBg: isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300",
  searchText: isDark
    ? "text-white placeholder-gray-400"
    : "text-black placeholder-gray-500",
});
const generateFixedPrice = (id) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++)
    hash = ((hash << 5) - hash + id.charCodeAt(i)) & 0xffffffff;
  return ((hash % 100) + 20).toFixed(2);
};

const Product = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState(getThemeLocal());
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await customFetch(`?q=${query}&maxResults=40`);
        setBooks([...(data.items || [])].sort(() => Math.random() - 0.5));
      } catch (err) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [query]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.state?.currentPage) setCurrentPage(location.state.currentPage);
    if (location.state?.query) {
      setQuery(location.state.query);
      setSearch(location.state.query);
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
  }, [location.state]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchSubmit = () => {
    setQuery(search.trim() || "all");
    setCurrentPage(1);
  };

  const handleAddToCart = (book) => {
    const priceAmount =
      book.saleInfo?.retailPrice?.amount ||
      parseFloat(generateFixedPrice(book.id));
    dispatch(
      addItem({
        ...book,
        calculatedPrice: Math.abs(priceAmount),
        quantity: 1,
      })
    );
    toast.success("Book added to cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const filteredBooks = useMemo(() => {
    if (!search.trim()) return books;
    return books.filter((book) =>
      book.volumeInfo?.title
        ?.toLowerCase()
        .includes(search.trim().toLowerCase())
    );
  }, [books, search]);

  const displayedBooks = useMemo(
    () =>
      filteredBooks.slice(
        (currentPage - 1) * BOOKS_PER_PAGE,
        currentPage * BOOKS_PER_PAGE
      ),
    [filteredBooks, currentPage]
  );

  const classes = getThemeClasses(theme === THEMES.dracula);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
      </div>
    );
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <>
      <img
        src={pro}
        alt="Books background"
        className="fixed inset-0 w-full h-full object-cover -z-10"
        style={{ opacity: 0.7 }}
      />
      <div
        className={`min-h-screen ${
          theme === "dracula" ? "bg-gray-900/80" : "bg-white/80"
        } backdrop-blur-sm py-10 rounded-sm`}
      >
        <div className="container mx-auto px-6">
          <div className="mb-10 flex justify-center">
            <div className="relative max-w-lg w-full">
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
                placeholder="Search by book title..."
                className={`w-full py-4 pl-12 pr-4 text-lg rounded-full border-2 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ${
                  theme === "dracula"
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className={`w-6 h-6 ${
                    theme === "dracula" ? "text-gray-400" : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                onClick={handleSearchSubmit}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          {!loading && displayedBooks.length === 0 && (
            <div className="text-center py-20">
              <img
                src={notimg}
                alt="Not found"
                className="mx-auto w-64 h-auto rounded-xl shadow-lg mb-6"
              />
              <p
                className={`text-2xl font-bold ${
                  theme === "dracula" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                No books found
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {displayedBooks.map((book) => {
              const info = book.volumeInfo;
              const priceAmount =
                book.saleInfo?.retailPrice?.amount ||
                parseFloat(generateFixedPrice(book.id));
              const price = `$${Math.abs(priceAmount)}`;
              return (
                <div
                  key={book.id}
                  className={`${
                    theme === "dracula" ? "bg-gray-800" : "bg-white"
                  } rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group border border-gray-200`}
                >
                  {/* Image Section */}
                  <div className="relative h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={info.imageLinks?.thumbnail || notimg}
                      alt={info.title}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {price}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <h2
                      className={`text-lg font-bold leading-tight ${
                        theme === "dracula" ? "text-white" : "text-gray-900"
                      } line-clamp-2 min-h-[3.5rem]`}
                    >
                      {info.title}
                    </h2>

                    <p
                      className={`text-sm ${
                        theme === "dracula" ? "text-gray-300" : "text-gray-600"
                      } font-medium`}
                    >
                      by {info.authors?.join(", ") || "Unknown Author"}
                    </p>

                    {info.averageRating && (
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < Math.floor(info.averageRating)
                                  ? "text-yellow-400"
                                  : theme === "dracula"
                                  ? "text-gray-600"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            theme === "dracula"
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
                        >
                          {info.averageRating}/5
                        </span>
                        {info.ratingsCount && (
                          <span
                            className={`text-xs ${
                              theme === "dracula"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            ({info.ratingsCount})
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4">
                      <Link
                        to={`/singleproduct/${book.id}`}
                        state={{ book, currentPage, query }}
                        className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
                        style={{ textDecoration: "none" }}
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleAddToCart(book)}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!loading && displayedBooks.length > 0 && (
            <div className="flex justify-center items-center mt-16 space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : `${
                        theme === "dracula"
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-white hover:bg-gray-50 text-gray-700"
                      } shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer`
                }`}
              >
                ← Previous
              </button>

              <div className="flex space-x-1">
                {Array.from(
                  {
                    length:
                      Math.ceil(filteredBooks.length / BOOKS_PER_PAGE) || 1,
                  },
                  (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-12 h-12 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-110 cursor-pointer ${
                        currentPage === i + 1
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl"
                          : `${
                              theme === "dracula"
                                ? "bg-gray-700 hover:bg-gray-600 text-white"
                                : "bg-white hover:bg-gray-50 text-gray-700"
                            } shadow-md hover:shadow-lg`
                      }`}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage ===
                    Math.ceil(filteredBooks.length / BOOKS_PER_PAGE) ||
                  filteredBooks.length === 0
                }
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                  currentPage ===
                    Math.ceil(filteredBooks.length / BOOKS_PER_PAGE) ||
                  filteredBooks.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : `${
                        theme === "dracula"
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-white hover:bg-gray-50 text-gray-700"
                      } shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer`
                }`}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer theme={theme === THEMES.dracula ? "dark" : "light"} />
    </>
  );
};

export default Product;
