import React from "react";
import TicketsHeader from "../ModulesControl/Tickets/TicketsHeader";
import CustomField from "../Formik/CustomField";
import * as Yup from "yup";
import { TfiWorld } from "react-icons/tfi";
import { FaFacebookF } from "react-icons/fa";
import { Form, Formik } from "formik";
import { FaInstagram } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";

const SocialInfo = () => {
  const initialValues = {
    website: "www.go-gogrow.com" || "",
    facebook: "www.facebook.com/gogogrow" || "",
    instagram: "www.instgram.com/gogogrow" || "",
    linkedin: "www.linkedin.com/gogogrow" || "",
  };

  const validationSchema = Yup.object({
    website: Yup.string(),
    facebook: Yup.string(),
    instagram: Yup.string(),
    linkedin: Yup.string(),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className=" p-4 bg-white shadow-card rounded-card">
      <TicketsHeader>Info Social Media</TicketsHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onsubmit}>
        {({ setFieldValue }) => (
          <Form>
            <div className=" mt-2">
              <CustomField
                icon={<TfiWorld className=" text-[18px]" />}
                label="Website"
                name="website"
                id="website"
                type="text"
                placeholder="GO GROW"
              />
            </div>
            <div className=" mt-2">
              <CustomField
                icon={<FaFacebookF className=" text-[18px]" />}
                label="Social Media Links"
                name="facebook"
                id="facebook"
                type="text"
                placeholder="www.facebook.com/gogogrow"
              />
              <CustomField
                icon={<FaInstagram className=" text-[18px]" />}
                name="instagram"
                id="instagram"
                type="text"
                placeholder="www.instgram.com/gogogrow"
              />
              <CustomField
                icon={<CiLinkedin className=" text-[18px]" />}
                name="linkedin"
                id="linkedin"
                type="text"
                placeholder="www.linkedin.com/gogogrow"
              />
            </div>
            <div className="w-full flex justify-end">
              <button
                type="submit"
                className="rounded-[8px] my-[10px] w-[100px] text-white px-1 py-1 bg-customBlue text-[14px] leading-[23px]">
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SocialInfo;
