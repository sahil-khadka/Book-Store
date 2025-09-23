import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import bookstoreimg from "../assets/bookstoreimg.jpg";
import AboImg from "../assets/FORabout.png";

const About = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode state
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    // Listen for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleExploreBooks = () => {
    navigate("/product");
  };

  return (
    <>
      <img
        src={AboImg}
        alt="Books background"
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        style={{ opacity: isDarkMode ? 0.3 : 0.5 }}
      />

      <div className="min-h-screen bg-gradient-to-b from-transparent via-base-700 to-base-200 py-9 transition-all duration-300 rounded-xl">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Book
              </span>
              <span className="text-pink-500 dark:text-pink-400 bg-base-100  px-4 py-2 rounded-2xl ml-2 shadow-lg">
                Store
              </span>
            </h1>
            <p className="text-xl text-base-600   max-w-3xl mx-auto leading-relaxed font-medium">
              Welcome to The Book Store, your one-stop destination for stories,
              knowledge, and imagination.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <img
                src={bookstoreimg}
                alt="Bookstore"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-4xl font-bold text-base-content  mb-6">
                Our Story
              </h2>
              <p className="text-lg leading-relaxed text-base-content mb-4 font-medium">
                At Book Haven, we believe that every book has the power to
                inspire, teach, and transform lives. Whether you're looking for
                the latest bestsellers, timeless classics, or hidden gems, our
                shelves are filled with books for every kind of reader.
              </p>
              <p className="text-lg leading-relaxed text-base-content  font-medium">
                Founded in 2020, we started as a small community bookstore with
                a big dream: to create a space where book lovers could discover
                their next favorite read and connect with fellow readers.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-base-600    mb-12">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-base-100 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-transparent dark:border-gray-700">
                <div className="text-4xl mb-4 text-center">📚</div>
                <h3 className="text-2xl font-bold text-base-600   mb-4 text-center">
                  Vast Collection
                </h3>
                <p className="text-base-600  text-center leading-relaxed font-medium">
                  Over 50,000 books across all genres, from fiction and
                  non-fiction to academic texts and children's books.
                </p>
              </div>

              <div className="bg-base-100 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-transparent dark:border-gray-700">
                <div className="text-4xl mb-4 text-center">🚚</div>
                <h3 className="text-2xl font-bold text-base-600  mb-4 text-center">
                  Fast Delivery
                </h3>
                <p className="text-base-600    text-center leading-relaxed font-medium">
                  Quick and reliable shipping with free delivery on orders over
                  $50. Get your books in 2-3 business days.
                </p>
              </div>

              <div className="bg-base-100 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-transparent dark:border-gray-700">
                <div className="text-4xl mb-4 text-center">💡</div>
                <h3 className="text-2xl font-bold text-base-600  mb-4 text-center">
                  Expert Recommendations
                </h3>
                <p className="text-base-600  text-center leading-relaxed font-medium">
                  Our knowledgeable staff provides personalized book
                  recommendations based on your interests.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 backdrop-blur-sm rounded-3xl p-12 mb-16 border border-transparent dark:border-gray-700">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-base-600  mb-8">
                Our Mission
              </h2>
              <p className="text-xl leading-relaxed text-base-600  max-w-4xl mx-auto mb-8 font-medium">
                To foster a love of reading by providing access to diverse,
                high-quality books and creating a welcoming community where
                stories connect people and ideas flourish.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                  Community
                </span>
                <span className="bg-purple-500 dark:bg-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                  Knowledge
                </span>
                <span className="bg-pink-500 dark:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                  Inspiration
                </span>
                <span className="bg-green-500 dark:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                  Discovery
                </span>
              </div>
            </div>
          </div>

          {/* Contact CTA Section */}
          <div className="text-center bg-base-100  backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-transparent ">
            <h2 className="text-3xl font-bold text-base-600  mb-6">
              Ready to Start Your Reading Journey?
            </h2>
            <p className="text-lg text-base-600  mb-8 max-w-2xl mx-auto font-medium">
              Browse our extensive collection and discover your next favorite
              book. Join thousands of satisfied readers who trust us for their
              literary needs.
            </p>
            <button
              onClick={handleExploreBooks}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            >
              Explore Our Books
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
