import React, { useEffect, useState } from "react";
import { customFetch } from "../utils";

const Product = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await customFetch("");
        setBooks(data.items || []);
      } catch (err) {
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <div className="text-2xl">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
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
  );
};

export default Product;
