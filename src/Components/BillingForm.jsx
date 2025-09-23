import React from "react";
import FormInput from "./FormInput";

const BillingForm = ({
  formData,
  errors,
  theme,
  handleInputChange,
  handleSubmit,
  isProcessing,
  getTotalPrice,
}) => {
  return (
    <div
      className={`${
        theme === "dracula" ? "bg-gray-800" : "bg-white"
      } rounded-3xl shadow-2xl p-8`}
    >
      <h2
        className={`text-2xl font-bold mb-6 ${
          theme === "dracula" ? "text-white" : "text-gray-900"
        }`}
      >
        Billing Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`${
              errors.firstName
                ? "bg-red-50 border-red-200 rounded-lg p-2 border-2"
                : ""
            }`}
          >
            <FormInput
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={errors.firstName}
              required
              theme={theme}
              className={`${
                errors.firstName
                  ? "border-red-500 focus:border-red-600 focus:ring-red-200"
                  : ""
              }`}
            />
          </div>
          <div
            className={`${
              errors.lastName
                ? "bg-red-50 border-red-200 rounded-lg p-2 border-2"
                : ""
            }`}
          >
            <FormInput
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={errors.lastName}
              required
              theme={theme}
              className={`${
                errors.lastName
                  ? "border-red-500 focus:border-red-600 focus:ring-red-200"
                  : ""
              }`}
            />
          </div>
        </div>

        <div
          className={`${
            errors.email
              ? "bg-red-50 border-red-200 rounded-lg p-2 border-2"
              : ""
          }`}
        >
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            theme={theme}
            className={`${
              errors.email
                ? "border-red-500 focus:border-red-600 focus:ring-red-200"
                : ""
            }`}
          />
        </div>

        <div
          className={`${
            errors.phone
              ? "bg-red-50 border-red-200 rounded-lg p-2 border-2"
              : ""
          }`}
        >
          <FormInput
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            error={errors.phone}
            required
            theme={theme}
            className={`${
              errors.phone
                ? "border-red-500 focus:border-red-600 focus:ring-red-200"
                : ""
            }`}
          />
        </div>

        {/* Address Information */}
        <div
          className={`${
            errors.address
              ? "bg-red-50 border-red-200 rounded-lg p-2 border-2"
              : ""
          }`}
        >
          <FormInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            error={errors.address}
            required
            theme={theme}
            className={`${
              errors.address
                ? "border-red-500 focus:border-red-600 focus:ring-red-200"
                : ""
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            className={`${
              errors.city
                ? "bg-red-50 border-red-200 rounded-lg p-2 border-2"
                : ""
            }`}
          >
            <FormInput
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              error={errors.city}
              required
              theme={theme}
              className={`${
                errors.city
                  ? "border-red-500 focus:border-red-600 focus:ring-red-200"
                  : ""
              }`}
            />
          </div>
          <div
            className={`${
              errors.zipCode
                ? "bg-red-50 border-red-200 rounded-lg p-2 border-2"
                : ""
            }`}
          >
            <FormInput
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              error={errors.zipCode}
              required
              theme={theme}
              className={`${
                errors.zipCode
                  ? "border-red-500 focus:border-red-600 focus:ring-red-200"
                  : ""
              }`}
            />
          </div>
        </div>

        {/* Payment Information */}
        <div
          className={`border-t pt-6 ${
            theme === "dracula" ? "border-gray-600" : "border-gray-200"
          } ${
            errors.cardHolder ||
            errors.cardNumber ||
            errors.expiryDate ||
            errors.cvv
              ? "bg-red-50 border-red-200 rounded-lg p-4 border-2 mt-4"
              : ""
          }`}
        >
          <h3
            className={`text-xl font-bold mb-4 ${
              theme === "dracula" ? "text-white" : "text-gray-900"
            } ${
              errors.cardHolder ||
              errors.cardNumber ||
              errors.expiryDate ||
              errors.cvv
                ? "text-red-700"
                : ""
            }`}
          >
            Payment Information
            {(errors.cardHolder ||
              errors.cardNumber ||
              errors.expiryDate ||
              errors.cvv) && (
              <span className="text-red-600 text-sm ml-2">
                ⚠️ Please check payment details
              </span>
            )}
          </h3>

          <div
            className={`${
              errors.cardHolder
                ? "bg-red-100 border-red-300 rounded-lg p-2 border-2 mb-4"
                : ""
            }`}
          >
            <FormInput
              label="Card Holder Name"
              name="cardHolder"
              value={formData.cardHolder}
              onChange={handleInputChange}
              error={errors.cardHolder}
              required
              theme={theme}
              className={`${
                errors.cardHolder
                  ? "border-red-500 focus:border-red-600 focus:ring-red-200"
                  : ""
              }`}
            />
          </div>

          <div
            className={`mt-4 ${
              errors.cardNumber
                ? "bg-red-100 border-red-300 rounded-lg p-2 border-2"
                : ""
            }`}
          >
            <FormInput
              label="Card Number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              error={errors.cardNumber}
              required
              theme={theme}
              className={`${
                errors.cardNumber
                  ? "border-red-500 focus:border-red-600 focus:ring-red-200"
                  : ""
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div
              className={`${
                errors.expiryDate
                  ? "bg-red-100 border-red-300 rounded-lg p-2 border-2"
                  : ""
              }`}
            >
              <FormInput
                label="Expiry Date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                error={errors.expiryDate}
                required
                theme={theme}
                className={`${
                  errors.expiryDate
                    ? "border-red-500 focus:border-red-600 focus:ring-red-200"
                    : ""
                }`}
              />
            </div>
            <div
              className={`${
                errors.cvv
                  ? "bg-red-100 border-red-300 rounded-lg p-2 border-2"
                  : ""
              }`}
            >
              <FormInput
                label="CVV"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                error={errors.cvv}
                required
                theme={theme}
                className={`${
                  errors.cvv
                    ? "border-red-500 focus:border-red-600 focus:ring-red-200"
                    : ""
                }`}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-4 px-8 rounded-full text-lg font-bold transition-all duration-300 ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-105"
          } text-white shadow-xl`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            `Place Order - $${getTotalPrice()}`
          )}
        </button>
      </form>
    </div>
  );
};

export default BillingForm;
