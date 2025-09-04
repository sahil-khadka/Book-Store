import { FormInput, SubmitBtn } from "../Components";
import { Form, Link } from "react-router-dom";
const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className=" w-96 p-8 bg-white rounded-lg flex flex-col gap-y-4 shadow-lg/30"
      >
        <h4 className="text-4xl text-center font-semibold">Register</h4>
        <FormInput type="text" lable="Username" />
        <FormInput type="email" lable="Email" />
        <FormInput type="password" lable="Password" />

        <SubmitBtn text="REGISTER" />

        <p className="text-center">
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
