import { useState } from "react";
import { useSelector } from "react-redux";
import image1 from "../assets/bluebook.png";
import image2 from "../assets/images-removebg-preview.png";
import { Link } from "react-router-dom";
import FeaturedBook from "../Components/FeaturedBook";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const theme = useSelector((state) => state.userState.theme);

  return (
    <>
      {/* Background image */}
      <img
        src="https://media.istockphoto.com/id/2020715428/photo/books.jpg?s=612x612&w=0&k=20&c=o8R9XFXGvItSpDEikvACtb1-WPNW-OyignUMVJSKOUw="
        alt="Books background"
        className="w-full blur-sm h-screen object-cover fixed top-0 left-0 -z-20"
        style={{ opacity: 0.6 }}
      />
      <div className="relative min-h-screen bg-gray-600 bg-opacity-20 flex items-center justify-center">
        {/* Info */}
        <div className="text-center max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-6xl lg:text-8xl  font-extrabold text-white mb-10 tracking-wide drop-shadow-lg">
            Welcome to Book Store
          </h1>
          <div className="flex justify-center mb-10">
            <hr className="w-40 border-t-8 border-orange-400 rounded-full shadow-lg" />
          </div>
          <p className="text-2xl lg:text-3xl text-gray-100 mb-8 leading-relaxed font-light max-w-5xl mx-auto">
            Discover your next favorite read! At Book Haven, we bring you a
            world of books at your fingertips. Browse our collection, find
            bestsellers, explore new releases, or dive into timeless classics —
            all in one place.
          </p>
          <p className="text-3xl lg:text-4xl text-orange-300 font-bold mb-16 drop-shadow-md">
            ✨ Start your reading journey today and let your imagination take
            flight!
          </p>
          <div>
            <Link
              to="/product"
              className="inline-block bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-6 px-12 rounded-full text-2xl transition-all duration-300 transform hover:scale-110 shadow-2xl uppercase tracking-wider"
            >
              Our Products
            </Link>
          </div>
        </div>
        <img
          src={image1}
          className="absolute bottom-10 right-20 w-60 lg:w-80 opacity-100 drop-shadow-2xl hidden lg:block transform rotate-12"
        />
        <img
          src={image2}
          className="absolute top-32 left-20 w-32 lg:w-48 opacity-60 drop-shadow-xl hidden lg:block transform -rotate-12"
        />
      </div>

      <div
        className={`${
          theme === "dracula" ? "bg-gray-900" : "bg-slate-100"
        } py-20`}
      >
        <h1
          className={`text-5xl lg:text-7xl font-bold text-center mb-6 ${
            theme === "dracula" ? "text-orange-400" : "text-slate-800"
          } tracking-wide`}
        >
          Featured Products
        </h1>
      </div>

      <div
        className={`${
          theme === "dracula" ? "bg-gray-900" : "bg-slate-100"
        } pb-8`}
      >
        <hr
          className={`w-60 mx-auto border-t-6 ${
            theme === "dracula" ? "border-orange-400" : "border-slate-600"
          } rounded-full shadow-md`}
        />
      </div>

      {/* Featured Books */}
      <div
        className={`${
          theme === "dracula" ? "bg-gray-900" : "bg-slate-100"
        } py-20 px-6`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {FeaturedBook.map((book) => (
            <Link
              to={`/featurepage/${book.id}`}
              key={book.id}
              className="group cursor-pointer block"
              style={{ textDecoration: "none" }}
            >
              <div
                className={`${
                  theme === "dracula"
                    ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600"
                    : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
                } rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6 hover:rotate-1 group-hover:scale-105 border h-full`}
              >
                {/* Image Section with Overlay */}
                <div className="relative overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      {book.price}
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-orange-400 opacity-60"></div>
                </div>

                {/* Content Section */}
                <div className="p-8 relative">
                  {/* Title */}
                  <h3
                    className={`text-2xl font-bold mb-4 leading-tight ${
                      theme === "dracula"
                        ? "text-white group-hover:text-orange-300"
                        : "text-slate-800 group-hover:text-orange-600"
                    } transition-all duration-300`}
                  >
                    {book.title}
                  </h3>

                  {/* Author with Icon */}
                  <div className="flex items-center mb-6">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    <p
                      className={`text-lg font-medium ${
                        theme === "dracula" ? "text-gray-300" : "text-slate-600"
                      }`}
                    >
                      by {book.author}
                    </p>
                  </div>

                  {/* Bottom Action Area */}
                  <div className="flex items-center justify-between mt-8">
                    <div
                      className={`text-sm font-semibold ${
                        theme === "dracula" ? "text-gray-400" : "text-slate-500"
                      }`}
                    >
                      Click to view details
                    </div>

                    {/* Arrow Icon */}
                    <div
                      className={`w-10 h-10 rounded-full ${
                        theme === "dracula" ? "bg-gray-700" : "bg-gray-100"
                      } flex items-center justify-center group-hover:bg-orange-500 transition-all duration-300 transform group-hover:scale-110`}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          theme === "dracula"
                            ? "text-gray-300"
                            : "text-gray-600"
                        } group-hover:text-white transition-colors duration-300`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Decorative Line */}
                  <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Hero;
