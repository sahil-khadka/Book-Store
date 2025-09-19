import { FormInput, SubmitBtn } from "../Components/index";
import { Form, Link, Links } from "react-router-dom";

const Login = () => {
  return (
    <>
      <img
        src={
          "https://t4.ftcdn.net/jpg/04/60/71/01/360_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg"
        }
        alt="Books background"
        className="fixed top-0 left-0 object-cover -z-10 min-h-screen w-full"
        style={{ opacity: 0.7 }}
      />
      <section className="h-screen grid place-items-center  ">
        <Form
          method="post"
          className=" w-130 h-120 p-8 bg-white rounded-lg flex flex-col gap-y-4 shadow-lg/30"
        >
          <h4 className=" text-center text-3xl font-bold text-black">Login</h4>
          <FormInput
            type="email"
            label="Email"
            name="identifier"
            defaultvalue="test@test.com"
          />
          <FormInput
            type="password"
            label="Passowrd"
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
          <p className="text-center text-black">
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
    </>
  );
};

export default Login;
