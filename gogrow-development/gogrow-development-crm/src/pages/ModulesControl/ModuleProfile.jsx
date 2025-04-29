import { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdCloudUpload } from "react-icons/md";

export const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/bmp",
  "image/webp",
];

const ModuleProfile = () => {
  const [ableText, setAbleText] = useState(true);
  const [ableDesc, setAbleDesc] = useState(true);
  const initialValues = {
    moduleName: text || "",
    moduleDescription: desc || "",
    moduleIcon: "", // Change to null to properly handle file inputs
  };

  const validationSchema = Yup.object({
    moduleName: Yup.string(),
    // .required("Module Name is required"),,
    moduleDescription: Yup.string(),
    // .required("Description is required"),
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
    <div className="   w-full  ">
      <div className="  w-full mx-auto  p-6 bg-white  shadow-card rounded-card   ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({ setFieldValue }) => (
            <Form>
              {/* Module Name */}
              <div className="mb-4">
                <label
                  className="block text-[16px] font-bold  text-primary"
                  htmlFor="moduleName">
                  Name Modules
                </label>
                <div className=" relative">
                  <Field
                    type="text"
                    id="moduleName"
                    name="moduleName"
                    disabled={ableText}
                    className="mt-1 px-8 relative p-2 w-full border rounded-full focus:outline-none focus:ring focus:ring-blue-200"
                  />

                  <LiaEditSolid
                    onClick={() => setAbleText((abel) => !abel)}
                    className=" absolute  cursor-pointer top-3 right-2 text-[20px] z-20"
                  />
                </div>

                <ErrorMessage
                  name="moduleName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Module Description */}
              <div className="mb-4">
                <label
                  className="block text-[16px] font-bold  text-primary"
                  htmlFor="moduleDescription">
                  Description Modules
                </label>
                <div className=" relative">
                  <Field
                    as="textarea"
                    id="moduleDescription"
                    name="moduleDescription"
                    rows="5"
                    disabled={ableDesc}
                    className="mt-1 p-2 px-8 w-full border rounded focus:outline-none focus:ring focus:ring-blue-200"
                  />
                  <LiaEditSolid
                    onClick={() => setAbleDesc((abel) => !abel)}
                    className=" absolute   cursor-pointer top-3 right-2 text-[20px] z-20"
                  />
                </div>
                <ErrorMessage
                  name="moduleDescription"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Module Icon */}
              <div className="mb-4">
                <label
                  className="block text-[16px] font-bold  text-primary"
                  htmlFor="moduleIcon">
                  Icons Modules
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
                  className="  px-12  bg-customBlue text-white p-2  rounded-full shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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

export default ModuleProfile;

const text = "Sales Modules";
const desc =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
/* <div className=" grid grid-cols-12">
        <div className="space-y-2 col-span-2 py-4  bg-white  shadow-card  rounded-card mt-10">
          <MenuItem
            icon={<LuLayoutDashboard />}
            label="Dashboard"
            to={"/dashboard"}
          />
          <MenuItem
            icon={<MdDisplaySettings />}
            label="Modules Customers"
            to="#"
          />
          <MenuItem
            icon={<PiUsersThree />}
            label="Customers"
          />
          <MenuItem
            icon={<PiUserListLight />}
            label="Roles"
          />
          <MenuItem
            icon={<TbReportAnalytics />}
            label="Reports"
          />

          <MenuItem
            icon={<MdOutlineCalendarMonth />}
            label="Calendar"
          />
          <MenuItem
            icon={<LiaFileInvoiceDollarSolid />}
            label="Invoice"
          />
        </div>
        <div className=" col-span-8"></div>
      </div> */
