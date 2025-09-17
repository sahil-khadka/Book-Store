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
    dispatch(addItem({ ...book, calculatedPrice: priceAmount }));
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
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-600"></div>
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <img
        src={pro}
        alt="Books background"
        className="fixed top-0 left-0 object-cover -z-10 min-h-screen w-full"
        style={{ opacity: 0.7 }}
      />
      <div
        className={`min-h-screen ${classes.bg} py-6 sm:py-8 md:py-12 lg:py-19 px-4 sm:px-6 md:px-8 lg:px-19 pt-20 rounded-3xl relative`}
      >
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md flex">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchSubmit();
              }}
              placeholder="Search by book title..."
              className={`w-full pl-10 pr-4 py-3 border rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md ${classes.searchBg} ${classes.searchText}`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
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
              className="px-6 py-3 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
            >
              Search
            </button>
          </div>
        </div>
        {!loading && displayedBooks.length === 0 && (
          <div className="text-center font-bold text-3xl text-red-500 mt-10">
            <img
              src={notimg}
              alt="Not found"
              className="mx-auto w-full max-w-xs h-auto rounded-2xl"
            />
          </div>
        )}
        {/* Responsive grid: 2 columns on mobile, 3 on medium and up */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 ">
          {displayedBooks.map((book) => {
            const info = book.volumeInfo;
            const priceAmount =
              book.saleInfo?.retailPrice?.amount ||
              parseFloat(generateFixedPrice(book.id));
            const price = `$${Math.abs(priceAmount)}`;
            return (
              <Link
                to={`/singleproduct/${book.id}`}
                state={{ book, currentPage, query }}
                key={book.id}
                className={`${classes.card} rounded-lg shadow-lg p-4 flex flex-col relative hover:shadow-xl hover:scale-105 transition duration-100 border`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={info.imageLinks?.thumbnail}
                  alt={info.title}
                  className="h-48 w-full max-w-xs mx-auto mb-4 rounded object-cover"
                />
                <h2
                  className={`text-2xl font-bold mb-2 text-center ${classes.text}`}
                >
                  {info.title}
                </h2>
                <p className={`text-lg ${classes.textGray} mb-1 text-center`}>
                  {info.authors?.join(", ") || "Unknown"}
                </p>
                {info.averageRating && (
                  <p className={`${classes.textGray} mb-2`}>
                    <span className="font-semibold">Rating:</span>{" "}
                    {info.averageRating}/5{" "}
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
                <div className="mt-auto">
                  <p
                    className={`text-2xl ${classes.textGray800} font-semibold text-center mb-2`}
                  >
                    {price}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <span className="text-blue-600 hover:underline">
                      More Info
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(book);
                      }}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-300 hover:text-black transition duration-300 hover:cursor-pointer w-full sm:w-auto"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {!loading && displayedBooks.length > 0 && (
          <div className="flex flex-wrap justify-center mt-8 gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mx-2 px-4 py-2 rounded font-bold text-2xl ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : classes.button
              }`}
            >
              &lt;
            </button>
            {Array.from(
              { length: Math.ceil(filteredBooks.length / BOOKS_PER_PAGE) || 1 },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`mx-2 px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? classes.paginationActive
                      : classes.pagination
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage ===
                  Math.ceil(filteredBooks.length / BOOKS_PER_PAGE) ||
                filteredBooks.length === 0
              }
              className={`mx-2 px-4 py-2 rounded font-bold text-2xl ${
                currentPage ===
                  Math.ceil(filteredBooks.length / BOOKS_PER_PAGE) ||
                filteredBooks.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : classes.button
              }`}
            >
              &gt;
            </button>
          </div>
        )}
        <ToastContainer theme={theme === THEMES.dracula ? "dark" : "light"} />
      </div>
    </>
  );
};

export default Product;
