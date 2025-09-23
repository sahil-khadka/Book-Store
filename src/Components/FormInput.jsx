import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder = "",
  theme,
  className = "",
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className={`block text-sm font-semibold ${
          error
            ? "text-red-600"
            : theme === "dracula"
            ? "text-gray-300"
            : "text-gray-700"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-600 focus:ring-red-200 bg-red-50"
            : theme === "dracula"
            ? "border-gray-600 bg-gray-700 text-white focus:border-purple-500 focus:ring-purple-200"
            : "border-gray-300 bg-white focus:border-indigo-500 focus:ring-indigo-200"
        } ${className}`}
        required={required}
      />
      {error && (
        <p className="text-red-600 text-sm flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
