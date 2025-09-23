import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../features/cartSlice";
import { addOrder } from "../features/orderSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSummary from "../Components/OrderSummary";
import BillingForm from "../Components/BillingForm";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.userState.user);
  const theme = useSelector((state) => state.userState.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => {
        const price = Math.abs(
          item.calculatedPrice ||
            item.saleInfo?.retailPrice?.amount ||
            parseFloat(item.price?.replace("$", "")) ||
            20
        );
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const generateOrderNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `ORD-${new Date().getFullYear()}-${timestamp
      .toString()
      .slice(-6)}${random}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
    if (!formData.cardNumber.trim())
      newErrors.cardNumber = "Card number is required";
    if (!formData.expiryDate.trim())
      newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
    if (!formData.cardHolder.trim())
      newErrors.cardHolder = "Card holder name is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Card number validation (basic)
    if (
      formData.cardNumber &&
      formData.cardNumber.replace(/\s/g, "").length !== 16
    ) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    // CVV validation
    if (formData.cvv && (formData.cvv.length < 3 || formData.cvv.length > 4)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const newOrder = {
        id: Date.now(),
        orderNumber: generateOrderNumber(),
        date: new Date().toISOString().split("T")[0],
        status: "processing",
        total: parseFloat(getTotalPrice()),
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        },
        paymentInfo: {
          cardHolder: formData.cardHolder,
          cardNumber: formData.cardNumber.slice(-4),
        },
        items: cartItems.map((item) => ({
          id: item.id,
          title: item.volumeInfo?.title || item.title,
          author: item.volumeInfo?.authors?.[0] || "Unknown Author",
          price: Math.abs(
            item.calculatedPrice ||
              item.saleInfo?.retailPrice?.amount ||
              parseFloat(item.price?.replace("$", "")) ||
              20
          ),
          quantity: item.quantity,
          image: item.volumeInfo?.imageLinks?.thumbnail || item.image,
        })),
      };

      dispatch(addOrder(newOrder));
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      setIsProcessing(false);

      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <>
        <img
          src={"https://kirtibook.in/static/media/books.f6da5e8d.jpg"}
          alt="Books background"
          className="fixed top-0 blur-sm left-0 object-cover -z-10 min-h-screen w-full"
          style={{ opacity: 0.6 }}
        />
        <div
          className={`min-h-screen ${
            theme === "dracula" ? "bg-gray-900/70" : "bg-white/70"
          } backdrop-blur-sm pt-20 pb-16 rounded-xl`}
        >
          <div className="container mx-auto px-6 max-w-2xl">
            <div
              className={`${
                theme === "dracula" ? "bg-gray-800" : "bg-white"
              } rounded-3xl shadow-2xl p-12 text-center`}
            >
              <h1
                className={`text-4xl font-bold mb-6 ${
                  theme === "dracula" ? "text-white" : "text-gray-900"
                }`}
              >
                Your Cart is Empty
              </h1>
              <p
                className={`text-lg mb-8 ${
                  theme === "dracula" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Add some books to proceed with checkout
              </p>
              <button
                onClick={() => navigate("/product")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200"
              >
                Browse Books
              </button>
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
        className="fixed top-0 left-0 blur-sm object-cover -z-10 min-h-screen w-full"
        style={{ opacity: 0.6 }}
      />
      <div
        className={`min-h-screen ${
          theme === "dracula" ? "bg-gray-900/70" : "bg-white/70"
        } backdrop-blur-sm   pt-20 pb-16`}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <h1
            className={`text-5xl font-bold text-center mb-12 ${
              theme === "dracula" ? "text-white" : "text-gray-900"
            }`}
          >
            Checkout
          </h1>

          <div className="grid lg:grid-cols-2 gap-12">
            <OrderSummary
              cartItems={cartItems}
              theme={theme}
              getTotalPrice={getTotalPrice}
            />
            <BillingForm
              formData={formData}
              errors={errors}
              theme={theme}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isProcessing={isProcessing}
              getTotalPrice={getTotalPrice}
            />
          </div>
        </div>
      </div>
      <ToastContainer theme={theme === "dracula" ? "dark" : "light"} />
    </>
  );
};

export default Checkout;
