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
        className="w-full h-screen object-cover fixed top-0 left-0 -z-20"
        style={{ opacity: 0.8 }}
      />
      <div className="relative min-h-screen bg-black bg-opacity-50 flex items-center justify-center">
        {/* Info */}
        <div className="text-center max-w-6xl mx-auto px-6 py-20">
          <h1 className="text-6xl lg:text-8xl font-extrabold text-white mb-10 tracking-wide drop-shadow-lg">
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
          className="absolute bottom-10 right-20 w-60 lg:w-80 opacity-80 drop-shadow-2xl hidden lg:block transform rotate-12"
        />
        <img
          src={image2}
          className="absolute top-32 left-20 w-32 lg:w-48 opacity-70 drop-shadow-xl hidden lg:block transform -rotate-12"
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
          theme === "dracula" ? "bg-gray-800" : "bg-slate-50"
        } py-20 px-6`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {FeaturedBook.map((book) => (
            <Link
              to={`/featurepage/${book.id}`}
              key={book.id}
              className={`${
                theme === "dracula"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-white hover:bg-gray-50"
              } rounded-3xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 group`}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="overflow-hidden rounded-2xl mb-6">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4 flex-grow">
                  <h3
                    className={`text-xl lg:text-2xl font-bold ${
                      theme === "dracula"
                        ? "text-white group-hover:text-orange-400"
                        : "text-slate-800 group-hover:text-orange-600"
                    } transition-colors duration-300 line-clamp-2`}
                  >
                    {book.title}
                  </h3>
                  <p
                    className={`text-lg ${
                      theme === "dracula" ? "text-gray-300" : "text-slate-600"
                    } font-medium`}
                  >
                    {book.author}
                  </p>
                  <p
                    className={`text-2xl lg:text-3xl font-bold ${
                      theme === "dracula"
                        ? "text-orange-400"
                        : "text-orange-600"
                    } mt-auto`}
                  >
                    {book.price}
                  </p>
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
