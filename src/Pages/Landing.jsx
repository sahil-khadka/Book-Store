import Hero from "../Components/Hero";
import { useEffect } from "react";
import { toast } from "react-toastify";
const Landing = () => {
  useEffect(() => {
    // Check for login success message
    const loginSuccess = sessionStorage.getItem("loginSuccess");
    if (loginSuccess) {
      toast.success(loginSuccess);
      sessionStorage.removeItem("loginSuccess"); // Remove after showing
    }
  }, []);

  return <Hero />;
};

export default Landing;
