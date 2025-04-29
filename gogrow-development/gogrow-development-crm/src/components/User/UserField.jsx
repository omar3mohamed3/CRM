import { ErrorMessage, Field } from "formik";

const UserField = ({ name, id, label, placeholder, type, apiError }) => {
  return (
    <div className="mb-2  flex flex-col gap-1">
      <label
        htmlFor={id}
        className="  text-primary text-[14px] leading-[21px] font-bold">
        {label}
      </label>
      <Field
        className="border rounded placeholder:text-opacity-50 border-borderGray py-1 px-2"
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
      />
      <ErrorMessage
        component={"div"}
        name={name}
        className=" text-red-500"
      />
      {apiError && <div className=" text-red-500">{apiError}</div>}
    </div>
  );
};

export default UserField;
