import { FormInput, SubmitBtn } from "../Components";
import { Form, Link, redirect } from "react-router-dom";
import { customIFetch } from "../utils/details";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const response = await customIFetch.post("/auth/local/register", data);
    toast.success("User registered successfully!");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message ||
      "please double check your credentials";

    toast.error("User registration failed!");
  }

  return null;
};
const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className=" w-96 p-8 bg-white rounded-lg flex flex-col gap-y-4 shadow-lg/30"
      >
        <h4 className="text-4xl text-center font-semibold text-black">
          Register
        </h4>
        <FormInput type="text" lable="Username" defaultValue="james2 smith" />
        <FormInput
          type="email"
          lable="Email"
          defaultValue="james2smith@gmail.com"
        />
        <FormInput type="password" lable="Password" defaultValue="secret" />

        <SubmitBtn text="REGISTER" />

        <p className="text-center text-black">
          Already a Member?
          <Link to="/login" className="text-purple-600 hover:text-red-400">
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
