import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";

const CustomField = ({
  label,
  type = "text",
  id = "moduleName",
  name = "moduleName",
  placeholder = "Go Grow",
  icon,
  onChange,
}) => {
  const [ableText, setAbleText] = useState(true);

  if (icon)
    return (
      <div className="mb-2">
        {label && (
          <label
            className="block text-[13px]  font-medium  text-primary"
            htmlFor="moduleName">
            {label}:
          </label>
        )}

        <div className=" relative">
          <div className=" absolute pr-2  border-r-[1px] border-[#707070]  top-3 left-2 text-[20px] z-20">
            {icon}
          </div>
          <Field
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            disabled={ableText}
            className="mt-1 px-10 relative p-1 text-[14px] w-full  border-b-[2px]   focus:outline-none  "
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
    );

  if (onChange)
    return (
      <div className="mb-4">
        {label && (
          <label
            className="block text-[14px]  font-medium  text-primary"
            htmlFor="moduleName">
            {label}:
          </label>
        )}

        <div className=" relative">
          <Field
            type={type}
            id={id}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            disabled={ableText}
            className="mt-1 pr-8 text-[14px] relative p-1 w-full  border-b-[2px]   focus:outline-none  "
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
    );
  return (
    <div className="mb-4">
      {label && (
        <label
          className="block text-[14px]  font-medium  text-primary"
          htmlFor="moduleName">
          {label}:
        </label>
      )}

      <div className=" relative">
        <Field
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          disabled={ableText}
          className="mt-1 pr-8 text-[14px] relative p-1 w-full  border-b-[2px]   focus:outline-none  "
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
  );
};

export default CustomField;
