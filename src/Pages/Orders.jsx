import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder } from "../features/orderSlice";
import { addItem } from "../features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const orders = useSelector((state) => state.orders.orders);
  const theme = useSelector((state) => state.userState.theme);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
    toast.success("Order cancelled successfully!");
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      dispatch(
        addItem({
          id: item.id,
          volumeInfo: {
            title: item.title,
            authors: [item.author],
            imageLinks: {
              thumbnail: item.image,
            },
          },
          calculatedPrice: item.price,
          quantity: item.quantity,
        })
      );
    });
    toast.success("Items added to cart!");
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  if (loading) {
    return (
      <>
        <img
          src={"https://kirtibook.in/static/media/books.f6da5e8d.jpg"}
          alt="Books background"
          className="fixed top-0 left-0 object-cover -z-10 min-h-screen w-full"
          style={{ opacity: 0.7 }}
        />
        <div
          className={`min-h-screen ${
            theme === "dracula" ? "bg-gray-900/70" : "bg-white/70"
          } backdrop-blur-sm pt-20 pb-16`}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p
                className={`mt-4 ${
                  theme === "dracula" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Loading your orders...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <img
        src={"https://kirtibook.in/static/media/books.f6da5e8d.jpg"}
        alt="Books background"
        className="fixed top-0 left-0 object-cover -z-10 min-h-screen w-full"
        style={{ opacity: 0.7 }}
      />
      <div
        className={`min-h-screen ${
          theme === "dracula" ? "bg-gray-900/70" : "bg-white/70"
        } backdrop-blur-sm pt-20 pb-16`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1
              className={`text-4xl font-bold mb-2 ${
                theme === "dracula" ? "text-white" : "text-gray-800"
              }`}
            >
              My Orders
            </h1>
            <p
              className={`${
                theme === "dracula" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Track and manage your book orders
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="mb-6 flex flex-wrap gap-2">
            {["all", "processing", "shipped", "delivered", "cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    filter === status
                      ? "bg-blue-600 text-white"
                      : theme === "dracula"
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {status === "all" ? "All Orders" : status}
                </button>
              )
            )}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div
              className={`${
                theme === "dracula" ? "bg-gray-800" : "bg-white"
              } rounded-3xl shadow-2xl p-12 text-center`}
            >
              <div
                className={`${
                  theme === "dracula" ? "text-gray-500" : "text-gray-400"
                } mb-4`}
              >
                <svg
                  className="mx-auto h-24 w-24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-4h-1V7a1 1 0 00-1-1H7a1 1 0 00-1 1v2H5"
                  ></path>
                </svg>
              </div>
              <h3
                className={`text-xl font-medium mb-2 ${
                  theme === "dracula" ? "text-white" : "text-gray-900"
                }`}
              >
                No orders found
              </h3>
              <p
                className={`${
                  theme === "dracula" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {filter === "all"
                  ? "You haven't placed any orders yet."
                  : `No orders with status "${filter}" found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className={`${
                    theme === "dracula" ? "bg-gray-800" : "bg-white"
                  } rounded-lg shadow-md border ${
                    theme === "dracula" ? "border-gray-700" : "border-gray-200"
                  } overflow-hidden`}
                >
                  {/* Order Header */}
                  <div
                    className={`${
                      theme === "dracula" ? "bg-gray-700" : "bg-gray-50"
                    } px-6 py-4 border-b ${
                      theme === "dracula"
                        ? "border-gray-600"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3
                          className={`text-lg font-semibold ${
                            theme === "dracula" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {order.orderNumber}
                        </h3>
                        <p
                          className={`text-sm ${
                            theme === "dracula"
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
                        >
                          Ordered on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                        <p
                          className={`text-lg font-bold mt-1 ${
                            theme === "dracula" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    <h4
                      className={`text-md font-medium mb-3 ${
                        theme === "dracula" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Items ({order.items.length})
                    </h4>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex justify-between items-center py-2 border-b ${
                            theme === "dracula"
                              ? "border-gray-700"
                              : "border-gray-100"
                          } last:border-b-0`}
                        >
                          <div className="flex items-center gap-4">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-16 object-cover rounded"
                              />
                            )}
                            <div className="flex-1">
                              <h5
                                className={`font-medium ${
                                  theme === "dracula"
                                    ? "text-white"
                                    : "text-gray-900"
                                }`}
                              >
                                {item.title}
                              </h5>
                              <p
                                className={`text-sm ${
                                  theme === "dracula"
                                    ? "text-gray-400"
                                    : "text-gray-600"
                                }`}
                              >
                                by {item.author}
                              </p>
                              <p
                                className={`text-sm ${
                                  theme === "dracula"
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                }`}
                              >
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-medium ${
                                theme === "dracula"
                                  ? "text-white"
                                  : "text-gray-900"
                              }`}
                            >
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div
                    className={`${
                      theme === "dracula" ? "bg-gray-700" : "bg-gray-50"
                    } px-6 py-3 border-t ${
                      theme === "dracula"
                        ? "border-gray-600"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                      <div className="space-x-2">
                        {order.status === "delivered" && (
                          <button
                            onClick={() => handleReorder(order)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
                          >
                            Reorder
                          </button>
                        )}
                        {order.status === "processing" && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                          >
                            Cancel Order
                          </button>
                        )}
                        {order.status === "delivered" && (
                          <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors">
                            Leave Review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ToastContainer theme={theme === "dracula" ? "dark" : "light"} />
    </>
  );
};

export default Orders;
