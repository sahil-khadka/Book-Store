import React from "react";

const OrderSummary = ({ cartItems, theme, getTotalPrice }) => {
  return (
    <div
      className={`${
        theme === "dracula" ? "bg-gray-800" : "bg-white"
      } rounded-3xl shadow-2xl p-8 h-fit`}
    >
      <h2
        className={`text-2xl font-bold mb-6 ${
          theme === "dracula" ? "text-white" : "text-gray-900"
        }`}
      >
        Order Summary
      </h2>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {cartItems.map((item) => {
          const title = item.volumeInfo?.title || item.title;
          const image = item.volumeInfo?.imageLinks?.thumbnail || item.image;
          const price = Math.abs(
            item.calculatedPrice ||
              item.saleInfo?.retailPrice?.amount ||
              parseFloat(item.price?.replace("$", "")) ||
              20
          );

          return (
            <div
              key={item.id}
              className={`flex items-center gap-4 p-4 rounded-lg ${
                theme === "dracula" ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <img
                src={image}
                alt={title}
                className="w-16 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3
                  className={`font-semibold ${
                    theme === "dracula" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`text-sm ${
                    theme === "dracula" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Quantity: {item.quantity}
                </p>
              </div>
              <p
                className={`font-bold ${
                  theme === "dracula" ? "text-white" : "text-gray-900"
                }`}
              >
                ${(price * item.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      <div
        className={`border-t pt-4 mt-6 ${
          theme === "dracula" ? "border-gray-600" : "border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center">
          <span
            className={`text-xl font-bold ${
              theme === "dracula" ? "text-white" : "text-gray-900"
            }`}
          >
            Total: ${getTotalPrice()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
