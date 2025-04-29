import { ErrorMessage, Field } from "formik";
import LeadHeader from "../../pages/Leads/LeadHeader";

const TeamField = ({
  label,
  name,
  id,
  type = "text",
  placeholder = "placeholder",
  className,
  apiError,
}) => {
  return (
    <div className="flex relative flex-col justify-between">
      <LeadHeader className="mb-3">{label}</LeadHeader>
      <Field name={name}>
        {({ field }) => (
          <div className="relative">
            <input
              {...field} // Spread Formik field props
              id={id}
              type={type}
              placeholder={placeholder}
              className={`p-2 pl-[55px] border  w-full border-borderGray   focus:outline-none rounded ${className}`}
            />
            <div className="absolute  flex justify-center items-center border-borderGray  px-2  border-r h-full top-0  ">
              EGY
            </div>{" "}
            {/* Adjust position */}
          </div>
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
      {apiError && <div className=" text-red-500">{apiError}</div>}
    </div>
  );
};

export default TeamField;
