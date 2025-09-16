import bookstoreimg from "../assets/bookstoreimg.jpg";
import AboImg from "../assets/FORabout.png";
const About = () => {
  return (
    <>
      <img
        src={AboImg}
        alt="Books background"
        className="fixed top-0 left-0 w-full h-290  object-cover -z-10"
        style={{ opacity: 0.5 }}
      />
      <div className="flex flex-col gap-2 items-center justify-center px-6 sm:gap-x-6  ">
        <h1 className="text-5xl font-bold border-3 p-3 rounded-2xl">
          Book
          <span className="text-pink-500  bg-gray-200 px-3 rounded-2xl">
            Store
          </span>
        </h1>

        <h2 className="text-3xl mt-10 text-center ">
          Welcome to The Book Store, your one-stop destination for stories,
          knowledge, and imagination.
        </h2>

        <div className="w-full my-8">
          <hr className="border-t-2 border-white w-full" />
        </div>

        <div className="flex flex-col sm:flex-row gap-7 items-start max-w-4xl">
          <img
            src={bookstoreimg}
            alt="Bookstore"
            className="h-80 w-auto rounded-2xl shadow-xl p-3 border-r-2"
          />

          <p className=" leading-relaxed text-black">
            At Book Haven, we believe that every book has the power to inspire,
            teach, and transform lives. Whether you’re looking for the latest
            bestsellers, timeless classics, or hidden gems, our shelves are
            filled with books for every kind of reader.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
