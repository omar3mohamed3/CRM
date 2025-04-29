import React, { useState } from "react";
import TicketsHeader from "../ModulesControl/Tickets/TicketsHeader";
import logo from "/public/Logo.png";
import CustomField from "../Formik/CustomField";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { SUPPORTED_FORMATS } from "../../pages/ModulesControl/ModuleProfile";
import { MdOutlineModeEditOutline } from "react-icons/md";

const CompanyInfo = () => {
  const [previewImage, setPreviewImage] = useState(logo);

  const initialValues = {
    companyName: "Go Grow" || "",
    companyPhone: "+00201018440" || "",
    companyIcon: null,
  };

  const validationSchema = Yup.object({
    companyName: Yup.string(),
    companyPhone: Yup.string().matches(
      /^[\d+]+$/,
      "Phone number must be only digits or a plus sign (+)"
    ),
    companyIcon: Yup.mixed()
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
    formData.append("companyName", values.companyName);
    formData.append("companyPhone", values.companyPhone);
    formData.append("companyIcon", values.companyIcon);
  };

  const handleNumberInput = (event, setFieldValue, fieldName) => {
    // Allow only digits and the + sign
    const value = event.target.value.replace(/[^+\d]/g, ""); // Remove all characters except digits and +
    setFieldValue(fieldName, value);
  };

  return (
    <div>
      <div className="p-4 bg-white shadow-card rounded-card">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({ setFieldValue }) => (
            <Form>
              <div>
                {/* Image */}
                <TicketsHeader>Profile</TicketsHeader>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <img
                      src={previewImage || logo}
                      className="rounded-full h-[30vh] w-[30vh]"
                      alt="Company Logo"
                    />
                    <Field name="companyIcon">
                      {({ field, form, meta }) => (
                        <div className="hidden">
                          <input
                            id="companyIcon"
                            name="companyIcon"
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.currentTarget.files[0];
                              setFieldValue("companyIcon", file);
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
                          {meta.touched && meta.error && (
                            <div>{meta.error}</div>
                          )}
                        </div>
                      )}
                    </Field>
                    {/* Edit Image */}
                    <label
                      htmlFor="companyIcon"
                      className="bottom-2 cursor-pointer border-[2px] border-white right-4 z-10 flex absolute justify-center w-6 h-6 items-center p-4 rounded-full bg-[#1492E6]">
                      <div className="bottom-0 border-[1px] border-white right-0 flex z-20 justify-center w-5 p-3 h-5 items-center rounded-full bg-[#1492E6]">
                        <MdOutlineModeEditOutline className="absolute text-white" />
                      </div>
                    </label>
                  </div>
                </div>
                {/* INFO */}
                <div>
                  <div className="mb-2">
                    <TicketsHeader>Info</TicketsHeader>
                  </div>
                  <CustomField
                    label="Company Name"
                    name="companyName"
                    id="companyName"
                    type="text"
                    placeholder="GO GROW"
                  />

                  <CustomField
                    label="Company Number"
                    name="companyPhone"
                    id="companyPhone"
                    type="text"
                    onChange={(event) =>
                      handleNumberInput(event, setFieldValue, "companyPhone")
                    }
                    placeholder="+00201018440"
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
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompanyInfo;
