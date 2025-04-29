import React, { useEffect, useState } from "react";
import logo from "/public/download.png";
import * as Yup from "yup";
import { SUPPORTED_FORMATS } from "../../pages/ModulesControl/ModuleProfile";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { MdOutlineModeEditOutline } from "react-icons/md";
import UserField from "./UserField";
import UserPasswordField from "./UserPasswordField";
import SingleSelectFilterDropdown from "../../pages/Leads/SingleSelectFilterDropdown";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createUser,
  fetchUserInfo,
  updateUserInfo,
} from "../../Store/usersSlice/userSlice";
import { deleteUser } from "../../Store/usersSlice/userSlice";
import Loader from "../Layout/Loader";
import toast from "react-hot-toast";
import { module_id } from "../../Url/url";
const Profile = ({ setStatus }) => {
  const { id: userId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, createerror } = useSelector((state) => state.user);
  const { userInfo } = useSelector((states) => states.auth);

  useEffect(() => {
    if (!userId) return;
    dispatch(fetchUserInfo(userId));
  }, [dispatch, userId]);

  const handleUpdate = (updatedData) => {
    dispatch(updateUserInfo(updatedData));
  };

  const handleDelete = () => {
    dispatch(deleteUser(userId));
  };

  const [previewImage, setPreviewImage] = useState(user?.photo_url || logo);
  const initialValues = {
    firstName: user?.name || "",
    lastName: user?.second_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    facebook: user?.facebook || "",
    linkedIn: user?.linkedin || "",
    password: "",
    password_confirmation: "",
    role: user?.roles?.[0]?.name || "admin",
    userImage: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters"),
    lastName: Yup.string()
      // .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters"),
    email: Yup.string().email("Invalid email format"),
    // .required("Email is required")
    role: Yup.string().required("Role is required"),
    phone: Yup.string()
      // .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number can't exceed 15 digits"),
    facebook: Yup.string()
      // .url("Invalid Facebook URL")
      .nullable(),
    linkedIn: Yup.string()
      // .url("Invalid LinkedIn URL")
      .nullable(),
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
    password_confirmation: Yup.string()
      .min(8, "Password Confirmation must be at least 8 characters")
      .nullable()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    userImage: Yup.mixed()
      .test(
        "fileSize",
        "يجب أن يكون حجم الملف أقل من 10 ميجا بايت",
        (value) => !value || (value && value.size <= 10 * 1024 * 1024) // 10 MB
      )
      .test(
        "fileFormat",
        "صيغة الملف غير مدعومة",
        (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
      ),
  });
  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.firstName);
    formData.append("second_name", values.lastName);
    formData.append("email", values.email);
    formData.append("role", values.role);
    formData.append("facebook", values.facebook);
    formData.append("linkedin", values.linkedIn);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
    formData.append("photo", values.userImage);
    formData.append("module_id", module_id());

    if (userId) {
      dispatch(updateUserInfo({ userId, userData: formData }))
        .unwrap()
        .then(() => {
          // navigate("/users");
          setStatus("permissions");
          toast.success("User Updated Successfully");
        });
    } else {
      dispatch(createUser(formData))
        .unwrap()
        .then(() => {
          //  navigate("/users");
          setStatus("permissions");
          toast.success("User Created Successfully");
        });
    }
  };
  if (loading) return <Loader />;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({ setFieldValue, setTouched, errors, values }) => {
        return (
          <Form className=" px-4 py-2">
            <div>
              {/* Image */}
              <div className=" text-[14px] leading-[21px] font-bold">
                Profile Image
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <img
                    src={previewImage || logo}
                    className="rounded-full h-[30vh] w-[30vh] border"
                    alt="Company Logo"
                  />
                  <Field name="userImage">
                    {({ field, form, meta }) => (
                      <div className="hidden">
                        <input
                          id="userImage"
                          name="userImage"
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            setFieldValue("userImage", file);
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setPreviewImage(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="mt-1"
                        />
                        {meta.touched && meta.error && <div>{meta.error}</div>}
                      </div>
                    )}
                  </Field>
                  {/* Edit Image */}
                  <label
                    htmlFor="userImage"
                    className="bottom-2 cursor-pointer border-[2px] border-white right-4 z-10 flex absolute justify-center w-6 h-6 items-center p-4 rounded-full bg-[#1492E6]">
                    <div className="bottom-0 border-[1px] border-white right-0 flex z-20 justify-center w-5 p-3 h-5 items-center rounded-full bg-[#1492E6]">
                      <MdOutlineModeEditOutline className="absolute text-white" />
                    </div>
                  </label>
                </div>
              </div>
              {/* INFO */}
              <div>
                <UserField
                  apiError={createerror?.errors?.name}
                  label={"First Name"}
                  name={"firstName"}
                  id={"firstName"}
                  placeholder={"Ahmed"}
                  type={"text"}
                />
                <UserField
                  apiError={createerror?.errors?.second_name}
                  label={"Last Name"}
                  name={"lastName"}
                  id={"lastName"}
                  placeholder={"Hany"}
                  type={"text"}
                />
                <UserField
                  apiError={createerror?.errors?.email}
                  label={"Email"}
                  name={"email"}
                  id={"email"}
                  placeholder={"Ahmedhany2@gmail.com"}
                  type={"text"}
                />
                <UserField
                  apiError={createerror?.errors?.phone}
                  label={"Phone"}
                  name={"phone"}
                  id={"phone"}
                  placeholder={"01241254541"}
                  type={"text"}
                />

                <UserField
                  apiError={createerror?.errors?.facebook}
                  label={"Facebook"}
                  name={"facebook"}
                  id={"facebook"}
                  placeholder={"https://www.facebook.com/gogogrow/"}
                  type={"text"}
                />
                <UserField
                  apiError={createerror?.errors?.linkedin}
                  label={"LinkedIn"}
                  name={"linkedIn"}
                  id={"linkedIn"}
                  placeholder={"https://www.facebook.com/gogogrow/"}
                  type={"text"}
                />
                <div className="mb-4 flex flex-col gap-1">
                  <label className="text-[14px] leading-[21px] font-bold">
                    Role
                  </label>
                  <SingleSelectFilterDropdown
                    filters={
                      userInfo?.identity === "admin"
                        ? [
                            { label: "Admin", id: "admin" },
                            { label: "User", id: "user" },
                          ]
                        : [{ label: "User", id: "user" }]
                    }
                    placeholder={user?.roles?.[0]?.name || "admin"}
                    width="w-full"
                    editedValues={{
                      id: user?.roles?.[0]?.name,
                      label: user?.roles?.[0]?.name,
                    }}
                    setFieldValues={(value) => setFieldValue("role", value)}
                    setTouched={(value) => setTouched("role", value)}
                  />
                  <ErrorMessage
                    id="role"
                    name="role"
                    component={"div"}
                    className=" text-red-500"
                  />
                  {createerror?.errors?.role && (
                    <div className=" text-red-500">
                      {createerror?.errors?.role}
                    </div>
                  )}
                </div>
                <UserPasswordField
                  apiError={createerror?.errors?.password}
                  label={"Password"}
                  name={"password"}
                  id={"password"}
                  placeholder={" "}
                  type={"password"}
                />
                <UserPasswordField
                  apiError={createerror?.errors?.password_confirmation}
                  label={"Confirm Password"}
                  name={"confirmPassword"}
                  id={"confirmPassword"}
                  placeholder={""}
                  type={"password"}
                />
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                type="submit"
                className="rounded-[8px] my-[30px] w-[100px] text-white px-1 py-1 bg-customBlue text-[14px] leading-[23px]">
                Save
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
export default Profile;
