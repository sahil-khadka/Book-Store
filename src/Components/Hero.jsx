import { useState } from "react";
import slider1 from "../assets/slider1.webp";
import slider2 from "../assets/slider2.webp";
import slider3 from "../assets/slider3.webp";
import slider4 from "../assets/slider4.webp";
import slider5 from "../assets/slider5.webp";
import { Link } from "react-router-dom";

const sliders = [slider1, slider2, slider3, slider4, slider5];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="grid lg:grid-cols-2 gap-24 item-center  ">
      {/* Info */}
      <div>
        <h1 className="text-6xl font-bold tracking-wider h-30">
          Welcome to Book Store
        </h1>
        <div className="w-full my-8">
          <hr className="border-t-2 border-gray-300 w-full" />
        </div>
        <p className="mt-10  mb-10 text-2xl">
          Discover your next favorite read! At Book Haven, we bring you a world
          of books at your fingertips. Browse our collection, find bestsellers,
          explore new releases, or dive into timeless classics — all in one
          place.
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
  );
};

export default Hero;
