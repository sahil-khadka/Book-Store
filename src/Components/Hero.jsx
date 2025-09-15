import { useState } from "react";
import slider1 from "../assets/slider1.webp";
import slider2 from "../assets/slider2.webp";
import slider3 from "../assets/slider3.webp";
import slider4 from "../assets/slider4.webp";
import slider5 from "../assets/slider5.webp";
import image1 from "../assets/image.png";
import { Link } from "react-router-dom";
import FeaturedBook from "../Components/FeaturedBook";

const sliders = [slider1, slider2, slider3, slider4, slider5];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-24 item-center  ">
        {/* Info */}
        <div>
          <h1 className="text-6xl font-bold tracking-wider h-30">
            Welcome to Book Store
          </h1>
          {/* <div>
            <img src={image1} alt="" />
          </div> */}
          <div className="w-full my-8">
            <hr className="border-t-2 border-gray-300 w-full" />
          </div>
          <p className="mt-10  mb-10 text-2xl">
            Discover your next favorite read! At Book Haven, we bring you a
            world of books at your fingertips. Browse our collection, find
            bestsellers, explore new releases, or dive into timeless classics —
            all in one place.
          </p>
          <p className="font-semibold tracking-wider">
            ✨ Start your reading journey today and let your imagination take
            flight!
          </p>
          <div className="mt-5">
            <Link
              to="/product"
              className=" btn btn-block btn-secondary btn-dash btn-xl "
            >
              Our Products
            </Link>
          </div>
        </div>

        {/* Slider */}
        <div className="hidden h-[32rem] w-[40rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
          {sliders.map((slider, index) => {
            return (
              <div key={index} className="carousel-item">
                <img
                  src={slider}
                  className="rounded-box h-full w-80 object-cover"
                />
                ;
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="text-4xl mt-25">Featured Products</h1>
      </div>
      <div className="w-full my-5">
        <hr className="border-t-2 border-gray-300 w-full" />
      </div>
      <div className="w-full my-5">
        <hr className="border-t-2 border-gray-300 w-full" />
      </div>
      {/* Featured Books */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {FeaturedBook.map((book) => (
          <div className="bg-gray-100 rounded-lg p-4 shadow-md" key={book.id}>
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-90 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-2">{book.author}</p>
            <p className="text-blue-600 font-bold">{book.price}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Hero;
