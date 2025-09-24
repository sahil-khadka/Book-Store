import { Outlet } from "react-router-dom";
import { Header, Navbar } from "../Components";
import Footer from "../Components/Footer";
const HomeLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <section className="align-element py-20">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};
export default HomeLayout;
