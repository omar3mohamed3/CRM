import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import {
  fetchUserDetails,
  updateUserDetails,
} from "../../Store/AccountSettings/userDetailsSlice";

const AccountDetails = () => {
  const dispatch = useDispatch();
  const { userDetails, loading, error } = useSelector(
    (state) => state.userDetails
  );

  // Fetch user details on component mount
  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [dispatch]);

  // Define initial form values (using userDetails from Redux state)
  const initialValues = {
    name: userDetails?.name || "",
    last_name: userDetails?.last_name || "",
    location: userDetails?.location || "",
    currency: userDetails?.currency || "EGP",
    email: userDetails?.email || "",
    phone: userDetails?.phone || "",
    address: userDetails?.address || "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Your Name is required"),
    last_name: Yup.string(),
    // .required("Last Name is required"),
    location: Yup.string(),
    // .required("Location is required"),
    currency: Yup.string(),
    // .required("Currency is required"),
    email: Yup.string().email("Invalid email format"),
    // .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    address: Yup.string(),
    // .required("Address is required"),
  });

  // Handle form submission
  const onSubmit = (values, { setSubmitting }) => {
    dispatch(updateUserDetails(values)).finally(() => {
      dispatch(fetchUserDetails());
      setSubmitting(false);
    });
  };

  return (
    <>
      <h2 className="text-lg font-bold mb-[2px]">Personal Details</h2>
      <p className="text-sm text-gray-600 mb-4">
        To change your personal details, edit and save from here
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize // Ensures form is updated when userDetails is fetched
        >
          {({ isSubmitting }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2  gap-4 lg:gap-x-[100px]">
              <div>
                <label className="block text-[16px] font-bold text-gray-700 mb-1">
                  Your Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-2 border-borderGray border rounded-[17px]"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                {error?.name && (
                  <div className=" text-red-500">{error?.name}</div>
                )}
              </div>

              <div>
                <label className="block text-[16px] font-bold text-gray-700 mb-1">
                  Last Name
                </label>
                <Field
                  type="text"
                  name="last_name"
                  className="w-full p-2 border-borderGray border rounded-[17px]"
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                {error?.last_name && (
                  <div className=" text-red-500">{error?.last_name}</div>
                )}
              </div>

              <div>
                <label className="block text-[16px] font-bold text-gray-700 mb-1">
                  Location
                </label>
                <Field
                  type="text"
                  name="location"
                  className="w-full p-2 border-borderGray border rounded-[17px]"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                {error?.location && (
                  <div className=" text-red-500">{error?.location}</div>
                )}
              </div>

              <div>
                <label className="block text-[16px] font-bold text-gray-700 mb-1">
                  Currency
                </label>
                <Field
                  type="text"
                  name="currency"
                  className="w-full p-2 border-borderGray border rounded-[17px]"
                />
                <ErrorMessage
                  name="currency"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                {error?.currency && (
                  <div className=" text-red-500">{error?.currency}</div>
                )}
              </div>

              <div>
                <label className="block text-[16px] font-bold text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border-borderGray border rounded-[17px]"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                {error?.email && (
                  <div className=" text-red-500">{error?.email}</div>
                )}
              </div>

              <div>
                <label className="block text-[16px] font-bold text-gray-700 mb-1">
                  Phone
                </label>
                <Field
                  type="tel"
                  name="phone"
                  className="w-full p-2 border-borderGray border rounded-[17px]"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                {error?.phone && (
                  <div className=" text-red-500">{error?.phone}</div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-[16px] font-bold text-gray-700 mb-1">
                  Address
                </label>
                <Field
                  type="text"
                  name="address"
                  className="w-full p-2 border-borderGray border rounded-[17px]"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                {error?.address && (
                  <div className=" text-red-500">{error?.address}</div>
                )}
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white w-[111px] h-[32px] rounded hover:bg-blue-600"
                  disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AccountDetails;
