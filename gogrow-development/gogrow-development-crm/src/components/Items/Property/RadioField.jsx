import React from "react";
import { Field, ErrorMessage } from "formik";
import LeadHeader from "../../../pages/Leads/LeadHeader";

const RadioField = ({ name, options, label }) => {
  return (
    <div className="flex flex-col gap-2">
      <LeadHeader>{label}</LeadHeader>
      <div className=" flex gap-6">
        {options && options.length > 0 ? (
          options.map((option, index) => (
            <label
              key={index}
              className="flex items-center text-[15px] font-bold">
              <Field
                type="radio"
                name={name}
                value={option.value}
                className="mr-2 "
              />
              {option.label}
            </label>
          ))
        ) : (
          <div>No options available</div>
        )}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default RadioField;
