import React from "react";
import TicketsHeader from "../ModulesControl/Tickets/TicketsHeader";
import CustomField from "../Formik/CustomField";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const PublicInfo = () => {
  const initialValues = {
    registrationNumber: "0101040040000" || "",
    TaxNumber: "04125221" || "",
  };

  const validationSchema = Yup.object({
    registrationNumber: Yup.string().matches(
      /^\d+$/,
      "Registration Number must be only digits"
    ),
    TaxNumber: Yup.string().matches(/^\d+$/, "Tax Number must be only digits"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const handleNumberInput = (event, setFieldValue, fieldName) => {
    const value = event.target.value.replace(/\D/g, ""); // Remove non-digits
    setFieldValue(fieldName, value);
  };

  return (
    <div className="p-4 bg-white shadow-card rounded-card">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({ setFieldValue }) => (
          <Form>
            <div>
              <div className="mb-2">
                <TicketsHeader>Public Info</TicketsHeader>
              </div>
              <CustomField
                label="Commercial Registration Number"
                name="registrationNumber"
                id="registrationNumber"
                type="text"
                placeholder="0101040040000"
                onChange={(event) =>
                  handleNumberInput(event, setFieldValue, "registrationNumber")
                }
              />

              <CustomField
                label="Commercial Registration Number"
                name="TaxNumber"
                id="TaxNumber"
                type="text"
                placeholder="04125221"
                onChange={(event) =>
                  handleNumberInput(event, setFieldValue, "TaxNumber")
                }
              />
            </div>

            <div className="w-full flex justify-end">
              <button
                type="submit"
                className="rounded-[8px] my-[5px] w-[100px] text-white px-1 py-1 bg-customBlue text-[14px] leading-[23px]">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PublicInfo;
