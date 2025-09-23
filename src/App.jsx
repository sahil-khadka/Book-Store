import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnimatedPage from "./features/AnimatedPage";

import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Login,
  Orders,
  Landing,
  Product,
  Register,
  SingleProduct,
  FeaturePage,
} from "./Pages";

import { ErrorElements } from "./Components";

import { action as registerAction } from "./Pages/Register";
import { action as loginAction } from "./Pages/Login";

import { store } from "./app";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AnimatedPage>
        <HomeLayout />
      </AnimatedPage>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElements />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/singleproduct/:id",
        element: <SingleProduct />,
        errorElement: <ErrorElements />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/featurepage/:id",
        element: <FeaturePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: "/Register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />

      {/* Global ToastContainer - Available on all pages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-50"
      />
    </div>
  );
};

export default App;
