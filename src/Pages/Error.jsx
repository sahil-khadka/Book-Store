import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <main className="grid min-h-[100vh] place-items-center px-8 bg-gray-500">
        <div className="text-center">
          <p className="text-9xl font-semibold text-pink-500">404</p>
          <p className="text-4xl font-bold text-white tracking-wide my-4">
            Page not found
          </p>
          <p className="font-bold text-white my-5">
            Sorry,we couldn't find the page you're looking for
          </p>

          <Link
            to="/"
            className="px-6 py-2 bg-purple-400 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
          >
            Go Back Home
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <h4 className="text-center font-bold text-4xl">There was and Error</h4>
    </main>
  );
};

export default Error;
