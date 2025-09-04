import { FormInput, SubmitBtn } from "../Components/index";
import { Form, Link, Links } from "react-router-dom";

const Login = () => {
  return (
    <section className="h-screen grid place-items-center  ">
      <Form
        method="post"
        className=" w-96 p-8 bg-white rounded-lg flex flex-col gap-y-4 shadow-lg/30"
      >
        <h4 className=" text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          lable="Email"
          name="identifier"
          defaultvalue="test@test.com"
        />
        <FormInput
          type="password"
          lable="Passowrd"
          name="password"
          defaultvalue="sceret"
        />
        <div className="mt-4">
          <SubmitBtn text="Login" />
        </div>
        <button
          type="button"
          className="bg-pink-500 rounded-lg font-semibold text-white px-6 py-2 hover:bg-green-300 transition-all"
        >
          Guest User
        </button>
        <p className="text-center">
          Not a Member yet?
          <Link
            to="/register"
            className="ml-2 text-purple-900  hover:text-red-400"
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
