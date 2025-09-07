import { useRouteError } from "react-router-dom";

const ErrorElements = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <h1 className="font-bold text-4xl">there was an Error..............</h1>
  );
};

export default ErrorElements;
