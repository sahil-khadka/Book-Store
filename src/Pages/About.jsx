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
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        } py-12`}
      >
        <div className="container mx-auto px-3 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Book
              </span>
              <span className="text-orange-500 bg-white px-4 py-2 rounded-2xl ml-2 shadow-lg">
                Store
              </span>
            </h1>
            <div className="w-40 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
            <p
              className={`text-lg md:text-xl mt-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } max-w-3xl mx-auto leading-relaxed font-medium`}
            >
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
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Our Story
              </h2>
              <p
                className={`text-lg leading-relaxed mb-4 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                At Book Haven, we believe that every book has the power to
                inspire, teach, and transform lives. Whether you're looking for
                the latest bestsellers, timeless classics, or hidden gems, our
                shelves are filled with books for every kind of reader.
              </p>
              <p
                className={`text-lg leading-relaxed font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Founded in 2020, we started as a small community bookstore with
                a big dream: to create a space where book lovers could discover
                their next favorite read and connect with fellow readers.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div
            className={`mb-16 ${
              isDarkMode ? "bg-gray-900" : "bg-slate-100"
            } py-12 px-6 rounded-3xl`}
          >
            <h2
              className={`text-4xl md:text-5xl font-bold text-center mb-12 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Why Choose Us?
              <div className="w-32 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <div
                className={`rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-600 transform hover:-translate-y-2 group-hover:scale-105 border h-full flex flex-col items-center text-center bg-gradient-to-br ${
                  isDarkMode
                    ? "from-gray-800 to-gray-700 border-gray-600"
                    : "from-white to-gray-50 border-gray-200"
                }`}
              >
                <div className="text-4xl mb-4 mt-4">📚</div>
                <h3
                  className={`text-xl font-bold mb-2 leading-tight ${
                    isDarkMode
                      ? "text-white group-hover:text-orange-300"
                      : "text-slate-800 group-hover:text-orange-600"
                  } transition-all duration-300`}
                >
                  Vast Collection
                </h3>
                <p
                  className={`text-sm font-medium mb-4 ${
                    isDarkMode ? "text-gray-300" : "text-slate-600"
                  }`}
                >
                  Over 50,000 books across all genres, from fiction and
                  non-fiction to academic texts and children's books.
                </p>
              </div>
              <div
                className={`rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-600 transform hover:-translate-y-2 group-hover:scale-105 border h-full flex flex-col items-center text-center bg-gradient-to-br ${
                  isDarkMode
                    ? "from-gray-800 to-gray-700 border-gray-600"
                    : "from-white to-gray-50 border-gray-200"
                }`}
              >
                <div className="text-4xl mb-4 mt-4">🚚</div>
                <h3
                  className={`text-xl font-bold mb-2 leading-tight ${
                    isDarkMode
                      ? "text-white group-hover:text-orange-300"
                      : "text-slate-800 group-hover:text-orange-600"
                  } transition-all duration-300`}
                >
                  Fast Delivery
                </h3>
                <p
                  className={`text-sm font-medium mb-4 ${
                    isDarkMode ? "text-gray-300" : "text-slate-600"
                  }`}
                >
                  Quick and reliable shipping with free delivery on orders over
                  $50. Get your books in 2-3 business days.
                </p>
              </div>
              <div
                className={`rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-600 transform hover:-translate-y-2 group-hover:scale-105 border h-full flex flex-col items-center text-center bg-gradient-to-br ${
                  isDarkMode
                    ? "from-gray-800 to-gray-700 border-gray-600"
                    : "from-white to-gray-50 border-gray-200"
                }`}
              >
                <div className="text-4xl mb-4 mt-4">💡</div>
                <h3
                  className={`text-xl font-bold mb-2 leading-tight ${
                    isDarkMode
                      ? "text-white group-hover:text-orange-300"
                      : "text-slate-800 group-hover:text-orange-600"
                  } transition-all duration-300`}
                >
                  Expert Recommendations
                </h3>
                <p
                  className={`text-sm font-medium mb-4 ${
                    isDarkMode ? "text-gray-300" : "text-slate-600"
                  }`}
                >
                  Our knowledgeable staff provides personalized book
                  recommendations based on your interests.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div
            className={`bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl p-12 mb-16 border border-transparent ${
              isDarkMode ? "dark:border-gray-700" : ""
            }`}
          >
            <div className="text-center">
              <h2
                className={`text-4xl font-bold mb-8 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Our Mission
              </h2>
              <p
                className={`text-xl leading-relaxed max-w-4xl mx-auto mb-8 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                To foster a love of reading by providing access to diverse,
                high-quality books and creating a welcoming community where
                stories connect people and ideas flourish.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                  Community
                </span>
                <span className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                  Knowledge
                </span>
                <span className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                  Inspiration
                </span>
                <span className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
                  Discovery
                </span>
              </div>
            </div>
          </div>

          {/* Contact CTA Section */}
          <div
            className={`text-center rounded-3xl p-12 shadow-2xl border border-transparent ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <h2
              className={`text-3xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Ready to Start Your Reading Journey?
            </h2>
            <p
              className={`text-lg mb-8 max-w-2xl mx-auto font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Browse our extensive collection and discover your next favorite
              book. Join thousands of satisfied readers who trust us for their
              literary needs.
            </p>
            <button
              onClick={handleExploreBooks}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            >
              Explore Our Books &rarr;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
