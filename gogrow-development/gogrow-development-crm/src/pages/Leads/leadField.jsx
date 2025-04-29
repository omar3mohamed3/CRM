import { ErrorMessage, Field } from "formik";
import LeadHeader from "./LeadHeader";

const LeadField = ({
  apiError,
  label,
  disable = false,
  name,
  id,
  as = "input",
  type = "text",
  placeholder = "placeholder",
  className,
}) => {
  return (
    <div className="flex flex-col   gap-1">
      <LeadHeader className="mb-3">{label}</LeadHeader>
      <Field
        id={id}
        name={name}
        type={type}
        as={as}
        disabled={disable}
        placeholder={placeholder}
        className={`p-2 border max-w-[450px]  border-borderGray rounded ${className} `}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
      {apiError && <div className=" text-red-500">{apiError}</div>}
    </div>
  );
};

export default LeadField;
