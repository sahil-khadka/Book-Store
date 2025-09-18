// AnimatedPage.jsx
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const AnimatedPage = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <motion.div
      key={location.pathname} // 👈 very important: remount on route change
      initial={{ opacity: 1, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.7, ease: "backOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
