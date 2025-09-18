import { useState } from "react";
import slider1 from "../assets/slider1.webp";
import slider2 from "../assets/slider2.webp";
import slider3 from "../assets/slider3.webp";
import slider4 from "../assets/slider4.webp";
import slider5 from "../assets/slider5.webp";
import image1 from "../assets/bluebook.png";
import image2 from "../assets/images-removebg-preview.png";
import { Link } from "react-router-dom";
import FeaturedBook from "../Components/FeaturedBook";

const sliders = [slider1, slider2, slider3, slider4, slider5];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  return (
    <>
      {/* Background image */}
      <img
        src="https://media.istockphoto.com/id/2020715428/photo/books.jpg?s=612x612&w=0&k=20&c=o8R9XFXGvItSpDEikvACtb1-WPNW-OyignUMVJSKOUw="
        alt="Books background"
        className="absolute top-0 left-0 w-full h-[47rem] md:h-[47rem] lg:h-[47rem] object-cover -z-10"
        style={{ opacity: 0.7 }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl mx-auto gap-8 lg:gap-24 items-center  px-4 md:px-8 ">
        {/* Info */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider h-30 bg-gradient-to-r from-cyan-200 to-violet-500 bg-clip-text text-transparent">
            Welcome to Book Store
          </h1>
          <div className="w-full my-8">
            <hr className="border-t-2 border-white w-full" />
          </div>
          <p className="mt-10 mb-10 text-lg md:text-xl lg:text-2xl text-white">
            Discover your next favorite read! At Book Haven, we bring you a
            world of books at your fingertips. Browse our collection, find
            bestsellers, explore new releases, or dive into timeless classics —
            all in one place.
          </p>
          <p className="font-extrabold text-base md:text-lg lg:text-xl tracking-wider bg-gradient-to-r from-red-500 to-violet-500 bg-clip-text text-transparent">
            ✨ Start your reading journey today and let your imagination take
            flight!
          </p>
          <div className="mt-5">
            <Link
              to="/product"
              className="btn btn-block  btn-dash btn-xl text-white border-white bg-violet-400 rounded-2xl border-2"
            >
              Our Products
            </Link>
          </div>
        </div>
        <img
          src={image1}
          className="w-150 h-auto absolute right-0 top-54 hidden lg:block"
        />
        <img
          src={image2}
          className="w-20 md:w-40 lg:w-80 h-auto absolute right-85 top-69 hidden lg:block"
        />
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl mt-10 font-semibold bg-gradient-to-r text-center from-cyan-200 to-violet-500 bg-clip-text text-transparent">
          Featured Products
        </h1>
      </div>
      <div className="w-full my-5">
        <hr className="border-t-2 border-black w-full" />
      </div>
      {/* Featured Books */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 px-4 md:px-0">
        {FeaturedBook.map((book) => (
          <Link
            to={`/featurepage/${book.id}`}
            key={book.id}
            className="bg-base-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow block"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-60 md:h-72 lg:h-90 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">{book.author}</p>
            <p className="text-blue-600 font-bold">{book.price}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Hero;
