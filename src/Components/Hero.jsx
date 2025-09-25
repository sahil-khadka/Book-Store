import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FeaturedBook from "../Components/FeaturedBook";

import Discover from "../assets/Discover.jpg";
import Reading from "../assets/Reading.jpg";
import New from "../assets/New.jpg";
import Collection from "../assets/Collection.jpg";
import Heaven from "../assets/Heaven.jpg";

const Hero = () => {
  const theme = useSelector((state) => state.userState.theme);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: Discover,
      title: "Discover Your Next Read",
      description:
        "Explore our vast collection of books that will take you on amazing journeys.",
    },
    {
      id: 2,
      image: New,
      title: "New Arrivals Daily",
      description: "Stay updated with the latest releases and bestsellers.",
    },
    {
      id: 3,
      image: Collection,
      title: "Special Collections",
      description: "Curated selections for every type of reader.",
    },
    {
      id: 4,
      image: Reading,
      title: "Reading Paradise",
      description: "Find your perfect reading companion today.",
    },
    {
      id: 5,
      image: Heaven,
      title: "Book Lovers' Haven",
      description: "Your destination for literary excellence.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Hero Slider Section */}
      <div className="relative">
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === slide.id - 1 ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/10">
                <div className="container mx-auto px-4 h-full flex items-center">
                  <div className="max-w-xl text-white p-4 md:p-0 5 rounded-lg px-6 py-4">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-sm md:text-lg lg:text-xl mb-4 md:mb-6 drop-shadow-lg">
                      {slide.description}
                    </p>
                    <button
                      className="bg-gradient-to-r from-orange-500 to-red-600 cursor-pointer hover:from-orange-600 hover:to-red-700 hover:scale-105 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-base md:text-lg transition-transform duration-300 shadow-lg"
                      onClick={() => navigate("/product")}
                    >
                      Explore Now &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-orange-500 w-8"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Books Section */}

      <div
        className={`${
          theme === "dracula" ? "bg-gray-900" : "bg-gray-50"
        } py-20`}
      >
        <div className="container mx-auto px-4">
          <h2
            className={`text-3xl md:text-4xl font-bold text-center mb-16 ${
              theme === "dracula" ? "text-white" : "text-gray-900"
            }`}
          >
            Featured Books
            <div className="w-40 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </h2>

          <div
            className={`${
              theme === "dracula" ? "bg-gray-900" : "bg-slate-100"
            } py-2 px-6`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
                    } rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-600 transform hover:-translate-y-6 hover:rotate-1 group-hover:scale-105 border h-full flex flex-col`}
                  >
                    {/* Image Section with Overlay */}
                    <div className="relative overflow-hidden">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-72 object-cover shadow-lg group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Price Badge */}

                      {/* Decorative Corner */}
                      <div className="absolute top-0 left-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-orange-400 opacity-60"></div>
                    </div>

                    {/* Content Section */}
                    <div className="py-4 px-5 relative flex flex-col items-center text-center justify-between flex-1">
                      {/* Title */}
                      <h3
                        className={`text-xl font-bold mb-2 leading-tight ${
                          theme === "dracula"
                            ? "text-white group-hover:text-orange-300"
                            : "text-slate-800 group-hover:text-orange-600"
                        } transition-all duration-300`}
                      >
                        {book.title}
                      </h3>

                      {/* Author with Icon */}
                      <div className="flex items-center justify-center mb-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                        <p
                          className={`text-sm font-medium ${
                            theme === "dracula"
                              ? "text-gray-300"
                              : "text-slate-600"
                          }`}
                        >
                          by {book.author}
                        </p>
                      </div>

                      <div className="">
                        <div className=" text-red-500 px-2 py-1 rounded-xl font-bold text-lg shadow-lg  group-hover:scale-110 transition-transform ">
                          {book.price}
                        </div>
                      </div>
                      {/* Bottom Action Area */}
                      <div className="flex items-center justify-center w-full gap-2 mt-4">
                        <span
                          className={`text-sm font-semibold ${
                            theme === "dracula"
                              ? "text-gray-400"
                              : "text-slate-500"
                          }`}
                        >
                          Click to view details
                        </span>
                        {/* Arrow Icon */}
                        <span>
                          <div
                            className={`w-8 h-8 rounded-full ${
                              theme === "dracula"
                                ? "bg-gray-700"
                                : "bg-gray-100"
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
                        </span>
                      </div>

                      {/* Decorative Line */}
                      <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
