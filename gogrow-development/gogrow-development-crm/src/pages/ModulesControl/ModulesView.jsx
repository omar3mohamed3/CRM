import React from "react";
import { SUPPORTED_FORMATS } from "./ModuleProfile";
import { ErrorMessage, Form, Formik } from "formik";
import { MdCloudUpload } from "react-icons/md";
import * as Yup from "yup";
import crmImage from "/public/30a37b519d.png";

const ModulesView = () => {
  const initialValues = {
    moduleIcon: "", // Change to null to properly handle file inputs
  };

  const validationSchema = Yup.object({
    moduleIcon: Yup.mixed()
      // .required("ادخل الصور ")
      // .required("Icon is Required")
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
  });

  const onSubmit = (values) => {
    const formData = new FormData();
  };

  return (
    <div className="  w-full  ">
      <div className="  w-full mx-auto  p-4 bg-white h-[75vh] overflow-y-auto  shadow-card rounded-card   ">
        <div className="  h-[63vh] flex-col flex justify-center px-[150px] py-5 items-center ">
          <img
            src={crmImage}
            alt="crm Image"
            className=" w-full h-full "
          />
          {/*TODO
             Delete CRM Image */}
        </div>
        <div className="my-7  w-full flex justify-end">
          <button className="  px-12  bg-[#E02632] text-white    py-1 rounded-full shadow hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Delete
          </button>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({ setFieldValue }) => (
            <Form>
              {/* Module Icon */}
              <div className="mb-4">
                <label
                  className="block text-[16px] font-bold  text-primary"
                  htmlFor="moduleIcon">
                  Photo Modules
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2   rounded-md">
                  <div className="space-y-1 flex flex-col items-center text-center">
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="moduleIcon"
                        className="relative cursor-pointer text-center  bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <MdCloudUpload className="  text-borderGray text-[80px]" />
                        {/* <span>Upload a file</span> */}
                        <input
                          id="moduleIcon"
                          name="moduleIcon"
                          type="file"
                          onChange={(event) => {
                            setFieldValue(
                              "moduleIcon",
                              event.currentTarget.files[0]
                            );
                          }}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    <ErrorMessage
                      name="moduleIcon"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6  flex justify-end">
                <button
                  type="submit"
                  className="  px-14  bg-customBlue text-white py-1  rounded-full shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModulesView;
