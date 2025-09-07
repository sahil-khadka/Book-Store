import React, { useEffect, useState } from "react";
import { customFetch } from "../utils";

const Product = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // search input state
  const [query, setQuery] = useState("all"); // actual query to fetch

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await customFetch(`?q=${query}`);
        setBooks(data.items || []);
      } catch (err) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search.trim() === "" ? "all" : search.trim());
  };

  if (loading) return <div className="text-2xl">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-8 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by book title..."
          className="border border-gray-300 rounded-l px-4 py-2 w-64 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => {
          const info = book.volumeInfo;
          return (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col"
            >
              <img
                src={info.imageLinks?.thumbnail}
                alt={info.title}
                className="h-48 w-auto mx-auto mb-4 rounded"
              />
              <h2 className="text-xl font-bold mb-2">{info.title}</h2>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Author:</span>{" "}
                {info.authors ? info.authors.join(", ") : "Unknown"}
              </p>
              <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                {info.description
                  ? info.description.slice(0, 120) + "..."
                  : "No description available."}
              </p>
              <a
                href={info.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-blue-600 hover:underline"
              >
                More Info
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
