import { ErrorMessage, Field } from "formik";
import NormalFont from "../NormalFont";

const TextField = ({ id, name, label, type, placeholder, apiError }) => {
  return (
    <div>
      <label htmlFor={id}>
        <NormalFont font="bold">{label}</NormalFont>
      </label>
      <Field
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="bg-gray-50 border   border-borderGray   rounded-[5px] focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
      {apiError && <div className="text-red-500 text-sm mt-1">{apiError}</div>}
    </div>
  );
};

export default TextField;
