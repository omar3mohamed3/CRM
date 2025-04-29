import { useState } from "react";
import * as Yup from "yup";
import Profile from "./Profile";
import Permissions from "./Permissions";
import { Form, Formik } from "formik";
import { SUPPORTED_FORMATS } from "../../pages/ModulesControl/ModuleProfile";
import { useParams } from "react-router-dom";

// IMportant
//////////////////////// GO TO UserProfile1.jsx ///////////////////////////
const UserProfile = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("profile");
  const permissions = [
    {
      feature: "Contracts",
      capabilities: ["View(Global)", "View(Own)", "Create", "Edit", "Delete"],
    },
    {
      feature: "Credit Notes",
      capabilities: ["View(Global)", "Create", "Edit", "Delete"],
    },
    {
      feature: "Customers",
      capabilities: ["View(Global)", "View(Own)", "Edit", "Delete"],
    },
    {
      feature: "Email Templates",
      capabilities: ["View(Global)", "Create", "Edit", "Delete"],
    },
    {
      feature: "Estimates",
      capabilities: ["View(Global)", "Create", "Edit", "Delete"],
    },
  ];

  const initialValues = {
    firstName: id ? "Ahmed" : "",
    LastName: id ? "Nagy" : "",
    email: id ? "Nagy@gmail.com" : "",
    phone: id ? "0122345678" : "",
    facebook: id ? "Nagy" : "",
    linkedIn: id ? "Nagy" : "",
    password: id ? "" : "",
    userImage: null,
    role: "0",
    ...permissions?.reduce((acc, permission) => {
      acc[permission.feature] = permission.capabilities.reduce(
        (capAcc, capability) => {
          capAcc[capability] = false;
          return capAcc;
        },
        {}
      );
      return acc;
    }, {}),
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters"),

    lastName: Yup.string()
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number can't exceed 15 digits"),

    facebook: Yup.string().url("Invalid Facebook URL").nullable(),

    linkedIn: Yup.string().url("Invalid LinkedIn URL").nullable(),

    password: Yup.string()

      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .nullable(),
    userImage: Yup.mixed()
      .test(
        "fileSize",
        "يجب أن يكون حجم الملف أقل من 10 ميجا بايت",
        (value) => value && value.size <= 10 * 1024 * 1024 // 10 MB
      )
      .test(
        "fileFormat",
        "صيغة الملف غير مدعومة",
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
    role: Yup.string().required("Role is required"),
    ...permissions.reduce((acc, permission) => {
      acc[permission.feature] = Yup.object().shape(
        permission.capabilities.reduce((capAcc, capability) => {
          capAcc[capability] = Yup.boolean();
          return capAcc;
        }, {})
      );
      return acc;
    }, {}),
  });
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="  rounded-card py-3  shadow-card bg-white">
      <div className=" border-b px-4 ">
        <button
          onClick={() => setStatus("profile")}
          className={`  text-[16px] font-bold leading-[23px] border-b-[2px] ${
            status === "profile" ? "border-[#2697E0]" : " border-transparent"
          }
           border-opacity-75 mr-[43px]`}>
          Profile
        </button>
        <button
          onClick={() => setStatus("permissions")}
          className={`  text-[16px] font-bold leading-[23px] border-b-[2px] ${
            status === "permissions"
              ? "border-[#2697E0]"
              : " border-transparent"
          }  border-opacity-75 mr-[43px]`}>
          Permissions
        </button>
      </div>

      {/* User Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ setFieldValue }) => (
          <Form className="px-4 py-2">
            {/* User Profile */}
            <div className={` ${status !== "profile" && " hidden"}`}>
              <Profile setFieldValue={setFieldValue} />
            </div>
            {/* User Permissions */}
            <div className={` ${status !== "permissions" && " hidden"}`}>
              <Permissions
                permissions={permissions}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className="w-full mt-auto flex justify-end">
              <button
                type="submit"
                className="rounded-[8px] my-[30px] w-[100px] text-white px-1 py-1 bg-customBlue text-[14px] leading-[23px]">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfile;
