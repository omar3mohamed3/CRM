import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../components/Formik/TextField";
import Checkbox from "../components/Formik/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  emailValidation,
  passwordValidation,
} from "../components/Formik/validationYUP";
import { loginUser } from "../Store/Auth/loginUser";
import { useEffect, useState } from "react";
import { token } from "../Url/url";
import { browserName, isMobile, osName } from "react-device-detect";
import { getDeviceInfo } from "../Url/device";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ip, setIP] = useState("");
  const { loading, error } = useSelector((states) => states.auth);

  // Navigate to  Dashboard if there is Token  USER!
  // useEffect(() => {
  //   token && navigate("/dashboard");
  // }, [navigate]);

  // Fetch IP Address
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIP(data.ip))
      .catch((error) => console.error("Error fetching IP:", error));
  }, []);

  const validationSchema = Yup.object({
    email: emailValidation,
    password: passwordValidation,
  });

  const onSubmit = (values) => {
    const { email, password, remember } = values;
    if (remember) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    }
    if (!remember) {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    // Dispatch login action with form values and remember me
    dispatch(
      loginUser({
        email,
        password,
        remember,
        ip_address: ip,
        device: getDeviceInfo(),
      })
    )
      .unwrap()
      .then(() => {
        navigate("/"); // Redirect on success
        window.location.reload();
      });
    // .catch((error) => {
    //   toast.error(message);
    // });
  };

  return (
    <section className="bg-gray-50 w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white sm:max-w-xs xl:p-0">
          <div className="px-7 py-5 rounded-[16px] shadow-card">
            <Formik
              initialValues={{
                email: localStorage.getItem("email") || "",
                password: localStorage.getItem("password") || "",
                remember: false,
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
              {({ isSubmitting }) => (
                <Form className="space-y-3 md:space-y-3">
                  <TextField
                    name="email"
                    id="email"
                    type="text"
                    apiError={error?.errors?.email}
                    label="Email Address"
                    placeholder="email@gmail.com"
                  />
                  <TextField
                    name="password"
                    id="password"
                    apiError={error?.errors?.password}
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                  />
                  <Checkbox
                    name="remember"
                    id="remember"
                    label="Remember me"
                  />
                  <button
                    type="submit"
                    className="w-full text-primary font-medium text-[12px] bg-yellowprimary py-3 rounded-[5px]"
                    // disabled={isSubmitting}
                  >
                    {loading ? "Signing in..." : "Sign in"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
